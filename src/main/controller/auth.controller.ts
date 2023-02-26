import abstractController from "../../abstracts/abstractController";
import AuthService from "../service/auth.service";

class AuthController extends abstractController {
  private authService = new AuthService();

  constructor() {
    super();
  }
}

export default AuthController;
