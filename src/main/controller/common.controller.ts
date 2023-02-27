import { Request, Response } from "express";
import abstractController from "../../abstracts/abstractController";
import CommonService from "../service/common.service";

class CommonController extends abstractController {
  private commonService = new CommonService();
  constructor() {
    super();
  }

  // user register controller
  public sentOtpController = this.assyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const data = await this.commonService.sentOtpService(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json(data);
      }
    }
  );

  // match otp controller
  public matchOtpController = this.assyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const data = await this.commonService.matchPhoneOtpService(req.body);

      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json(data);
      }
    }
  );
}

export default CommonController;
