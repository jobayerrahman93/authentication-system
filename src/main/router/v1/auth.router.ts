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
    // user login router
    this.routers
      .route("/verify-phone")
      .put(
        this.AuthInputValidator.verifyPhoneValidator(),
        this.authController.userVerifyPhoneController
      );

    // change password after login router
    this.routers
      .route("/change-password")
      .put(
        this.AuthInputValidator.changePasswordValidator(),
        this.authController.userChangePasswordController
      );

    // forget password
    this.routers
      .route("/forget-password")
      .put(
        this.AuthInputValidator.forgetPasswordValidator(),
        this.authController.forgetPasswordController
      );
  }
}

export default AuthRouter;
