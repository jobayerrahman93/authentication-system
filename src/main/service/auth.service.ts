import { Request } from "express";
import AbstractServices from "../../abstracts/abstractServices";
import config from "../../common/config/config";
import Lib from "../../common/utils/libraries/lib";

class AuthService extends AbstractServices {
  constructor() {
    super();
  }

  // user register service
  public authRegisterService = async (req: Request) => {
    return await this.db.transaction(async (trx) => {
      const { user_name, user_phone, user_email, user_password } = req.body;

      const checkUser = await trx("user")
        .select("user_id", "user_email", "verified_email")
        .andWhere({ user_phone })
        .andWhere({ verified_phone: "verified" })
        .orWhere({ user_email })
        .andWhere({ verified_email: "verified" });

      if (checkUser.length) {
        if (
          checkUser[0].user_email &&
          checkUser[0].verified_email === "verified"
        ) {
          return {
            success: false,
            message: "User already registered with this email",
          };
        } else {
          return {
            success: false,
            message: "User already registered with this phone number",
          };
        }
      }

      const hashedPassword = await Lib.hashPass(user_password);

      const insertObj = {
        user_name,
        user_email,
        user_phone,
        hashed_password: hashedPassword,
      };

      const data = await trx("user").insert(insertObj);

      const token = Lib.createToken(
        {
          user_id: data[0],
          user_name,
          user_email,
          user_phone,
          type: "user",
        },
        config.JWT_SECRET_USER,
        "24h"
      );

      return {
        success: true,
        data: {
          user_id: data[0],
          user_name,
          user_email,
          user_phone,
        },
        token,
      };
    });
  };

  // user login service
  public authLoginService = async (req: Request) => {
    const { user_phone, user_password } = req.body;
    const checkMember = await this.db("user")
      .select(
        "user_id",
        "user_name",
        "user_phone",
        "user_email",
        "hashed_password",
        "verified_phone"
      )
      .where({ user_phone });

    if (!checkMember.length) {
      return {
        success: false,
        message: "User not found!",
      };
    }

    const verifiedUser = checkMember.filter(
      (user) => user.verified_phone === "verified"
    );

    if (!verifiedUser.length) {
      return {
        success: false,
        message: "Your phone number is not verified!",
      };
    }

    const { hashed_password, ...rest } = verifiedUser[0];
    const checkPass = await Lib.compare(user_password, hashed_password);

    if (!checkPass) {
      return {
        success: false,
        message: "Wrong password!",
      };
    }

    const token = Lib.createToken(
      { ...rest, type: "user" },
      config.JWT_SECRET_USER,
      "24h"
    );

    return {
      success: true,
      data: { ...rest },
      token,
    };
  };
  // user verify phone service
  public userVerifyPhoneService = async (req: Request) => {
    const { user_phone: userPhone, token, otp_type, user_id } = req.body;

    const tokenVerify: any = Lib.verifyToken(token, config.JWT_SECRET_USER);

    if (tokenVerify) {
      const { user_phone, otp_type } = tokenVerify;

      if (user_phone !== userPhone && otp_type !== "phone-verify") {
        return {
          success: false,
          message: "Invalid token please try again!",
        };
      } else {
        const res = await this.db("user")
          .update({
            verified_phone: "verified",
          })
          .where({ user_id });

        if (res) {
          return {
            success: true,
            message: "Phone number has been verified",
          };
        } else {
          return {
            success: true,
            message: "Phone number not verify at this moment",
          };
        }
      }
    } else {
      return {
        success: false,
        message: "Invalid token please try again!",
      };
    }
  };

  // user change password service
  public userChangePasswordService = async (req: Request) => {
    const { new_password, old_password, user_id } = req.body;

    const checkMember = await this.db("user")
      .select("user_name", "user_phone", "hashed_password")
      .where({ user_id });

    if (checkMember.length) {
      const { hashed_password } = checkMember[0];

      const checkPass = await Lib.compare(old_password, hashed_password);
      const hashPass = await Lib.hashPass(new_password);

      if (checkPass) {
        const res = await this.db("user")
          .update({ hashed_password: hashPass })
          .where({ user_id });

        if (res) {
          return {
            success: true,
            message: "Successfully Changed password",
          };
        } else {
          return {
            success: false,
            message: "Cannot Changed password now",
          };
        }
      } else {
        return {
          success: false,
          message: "Incorrect password",
        };
      }
    } else {
      return {
        success: false,
        message: "User Not Found",
      };
    }
  };

  // user forget password service
  public userForgetPasswordService = async (req: Request) => {
    const { new_password, token, user_phone: userPhone } = req.body;

    const tokenVerify: any = Lib.verifyToken(token, config.JWT_SECRET_USER);
    const hashPass = await Lib.hashPass(new_password);
    if (tokenVerify) {
      const { user_phone, type } = tokenVerify;

      if (userPhone === user_phone && type === "forget-password") {
        const res = await this.db("user")
          .update({ hashed_password: hashPass })
          .where({ user_phone });
        if (res) {
          return {
            success: true,
            message: "Successfully Changed password",
          };
        } else {
          return {
            success: false,
            message: "Cannot Changed password now",
          };
        }
      } else {
        return {
          success: false,
          message:
            "Unauthorized token, It doesent match with your phone or type",
        };
      }
    } else {
      return { success: false, message: "Invalid token or token expired" };
    }
  };
}

export default AuthService;
