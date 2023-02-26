import AbstractRouter from "../../../abstracts/abstractRouter";
import AuthController from "../../controller/auth.controller";

class AuthRouter extends AbstractRouter {
  private authController = new AuthController();
  constructor() {
    super();

    this.callRouter();
  }

  private callRouter() {
    // user register router
    this.routers
      .route("/user/registration")
      .post(
        this.AuthInputValidatior.userRegisterValidation(),
        this.authController.userRegisterController
      );
  }
}

export default AuthRouter;
