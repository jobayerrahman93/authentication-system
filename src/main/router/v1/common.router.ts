import AbstractRouter from "../../../abstracts/abstractRouter";
import CommonController from "../../controller/common.controller";

class CommonRouter extends AbstractRouter {
  private commonController = new CommonController();
  constructor() {
    super();

    this.callRouter();
  }

  private callRouter() {
    // user register router
    this.routers
      .route("/send-phone/otp")
      .post(
        this.CommonInputValidator.sentOtpPhoneInputValidator(),
        this.commonController.sentOtpController
      );
  }
}

export default CommonRouter;
