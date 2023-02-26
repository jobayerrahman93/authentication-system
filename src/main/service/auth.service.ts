import { Request } from "express";
import AbstractServices from "../../abstracts/abstractServices";

class AuthService extends AbstractServices {
  constructor() {
    super();
  }

  public authRegisterService = (req: Request) => {
    return {
      success: true,
      message: "Successfully registered",
    };
  };
}

export default AuthService;
