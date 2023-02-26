import { Router } from "express";
import AuthInputValidation from "../common/middlewares/validator/authInputValidator";

abstract class AbstractRouter {
  readonly routers = Router();
  public AuthInputValidatior = new AuthInputValidation();
}

export default AbstractRouter;
