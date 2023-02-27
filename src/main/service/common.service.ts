import { Request } from "express";
import AbstractServices from "../../abstracts/abstractServices";
import config from "../../common/config/config";
import Lib from "../../common/utils/libraries/lib";

class CommonService extends AbstractServices {
  constructor() {
    super();
  }

  // sent otp service
  public sentOtpService = async (req: Request) => {
    return await this.db.transaction(async (trx) => {
      const { otp_phone, otp_type } = req.body;

      const checkUser = await trx("user")
        .select("user_id", "user_email", "verified_email")
        .andWhere({ user_phone: otp_phone });

      if (checkUser.length) {
        const checkOtp = await this.db("otp")
          .select("otp_id", "hashed_otp", "otp_tried")
          .andWhere("otp_phone", otp_phone)
          .andWhere("otp_type", otp_type)
          .andWhere("otp_match", 0)
          .andWhere("otp_tried", "<", 3)
          .andWhereRaw("ADDTIME(otp_create_time, '0:3:0') > NOW()");

        if (checkOtp.length > 0) {
          return {
            success: false,
            message: "Cannot send another OTP within 3 minutes",
          };
        }

        const otp = Lib.otpGenNumber(6);
        const hashed_otp = await Lib.hashPass(otp);
        const otp_creds = {
          otp_phone,
          otp_type,
          hashed_otp,
        };

        await trx("otp").insert(otp_creds);

        return {
          success: true,
          message: `Your otp ${otp_type} is ${otp}`,
        };
      } else {
        return {
          success: false,
          message: "User not found with this phone number",
        };
      }
    });
  };

  //match phone otp service
  public async matchPhoneOtpService(obj: {
    user_phone: string;
    otp: string;
    otp_type: string;
  }) {
    const table = "otp";
    const checkOtp = await this.db("otp")
      .select("otp_id", "hashed_otp", "otp_tried")
      .andWhere("otp_phone", obj.user_phone)
      .andWhere("otp_type", obj.otp_type)
      .andWhere("otp_match", 0)
      .andWhere("otp_tried", "<", 3)
      .andWhereRaw("ADDTIME(otp_create_time, '0:5:0') > NOW()");

    if (!checkOtp.length) {
      return {
        success: false,
        message: "OTP expired",
      };
    }
    const { otp_id, hashed_otp, otp_tried } = checkOtp[0];

    if (otp_tried > 3) {
      return {
        success: false,
        message: "You tried more then 3 time for this otp verification!",
      };
    }

    const otpValidation = await Lib.compare(obj.otp, hashed_otp);

    if (otpValidation) {
      await this.db(table)
        .update({
          otp_tried: otp_tried + 1,
          otp_match: 1,
        })
        .where("otp_id", otp_id);

      let secret = config.JWT_SECRET_USER;

      switch (obj.otp_type) {
        case "phone-verify":
          secret = config.JWT_SECRET_USER;
          break;
        default:
          break;
      }

      const token = Lib.createToken(
        {
          user_phone: obj.user_phone,
          type: obj.otp_type,
        },
        secret,
        "5m"
      );

      return {
        success: true,
        message: "OTP matched successfully!",
        token,
      };
    } else {
      await this.db(table)
        .update({
          otp_tried: otp_tried + 1,
        })
        .where("otp_id", otp_id);

      return {
        success: false,
        message: "Invalid OTP",
      };
    }
  }
}

export default CommonService;
