import { Request, Response } from "express";
import abstractController from "../../abstracts/abstractController";
import AuthService from "../service/auth.service";

class AuthController extends abstractController {
  private authService = new AuthService();

  constructor() {
    super();
  }

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
}

export default AuthController;
