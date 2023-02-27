import AbstractRouter from "../../../abstracts/abstractRouter";
import CommonController from "../../controller/common.controller";

class CommonRouter extends AbstractRouter {
  private commonController = new CommonController();
  constructor() {
    super();

    this.callRouter();
  }

  private callRouter() {
    // send otp router
    this.routers
      .route("/send-phone/otp")
      .post(
        this.CommonInputValidator.sentOtpPhoneInputValidator(),
        this.commonController.sentOtpController
      );

    // match phone otp
    this.routers.post(
      "/match-otp",
      this.CommonInputValidator.matchOtpInputValidator(),
      this.commonController.matchOtpController
    );
  }
}

export default CommonRouter;
