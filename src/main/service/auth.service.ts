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
}

export default AuthService;
