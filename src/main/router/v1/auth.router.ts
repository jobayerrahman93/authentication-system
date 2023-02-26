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
        this.AuthInputValidatior.userRegisterValidator(),
        this.authController.userRegisterController
      );
    // user login router
    this.routers
      .route("/user/login")
      .post(
        this.AuthInputValidatior.userLoginValidator(),
        this.authController.userLoginController
      );
  }
}

export default AuthRouter;
