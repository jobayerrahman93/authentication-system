import AbstractRouter from "../../../abstracts/abstractRouter";
import AuthController from "../../controller/auth.controller";

class AuthRouter extends AbstractRouter {
  private authController = new AuthController();
  constructor() {
    super();

    this.callRouter();
  }

  private callRouter() {}
}

export default AuthRouter;
