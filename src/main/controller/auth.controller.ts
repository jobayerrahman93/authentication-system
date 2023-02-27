import { Request, Response } from "express";
import abstractController from "../../abstracts/abstractController";
import AuthService from "../service/auth.service";

class AuthController extends abstractController {
  private authService = new AuthService();

  constructor() {
    super();
  }

  // user register controller
  public userRegisterController = this.assyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const data = await this.authService.authRegisterService(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json(data);
      }
    }
  );
  // user login controller
  public userLoginController = this.assyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const data = await this.authService.authLoginService(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json(data);
      }
    }
  );
  // user verify phone controller
  public userVerifyPhoneController = this.assyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const data = await this.authService.userVerifyPhoneService(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json(data);
      }
    }
  );
}

export default AuthController;
