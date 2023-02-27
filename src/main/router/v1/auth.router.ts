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
        this.AuthInputValidator.userRegisterValidator(),
        this.authController.userRegisterController
      );
    // user login router
    this.routers
      .route("/user/login")
      .post(
        this.AuthInputValidator.userLoginValidator(),
        this.authController.userLoginController
      );
  }
}

export default AuthRouter;
