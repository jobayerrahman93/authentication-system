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
      const { user_phone } = req.body;

      const checkUser = await trx("user")
        .select("user_id", "user_email", "verified_email")
        .andWhere({ user_phone });

      if (checkUser.length) {
        const otp = Lib.otpGenNumber(4);

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
