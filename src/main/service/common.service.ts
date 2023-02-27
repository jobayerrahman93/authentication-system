import { Request } from "express";
import AbstractServices from "../../abstracts/abstractServices";
import Lib from "../../common/utils/libraries/lib";

class CommonService extends AbstractServices {
  constructor() {
    super();
  }

  // user register service
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

        await this.db("otp").insert(otp_creds);

        return {
          success: true,
          message: `Your otp is ${otp}`,
        };
      } else {
        return {
          success: false,
          message: "User not found with this phone number",
        };
      }
    });
  };
}

export default CommonService;
