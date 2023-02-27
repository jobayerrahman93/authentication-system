import { Router } from "express";
import AuthInputValidation from "../common/middlewares/validator/authInputValidator";
import CommonInputValidation from "../common/middlewares/validator/commonInputValidator";

abstract class AbstractRouter {
  readonly routers = Router();
  public AuthInputValidator = new AuthInputValidation();
  public CommonInputValidator = new CommonInputValidation();
}

export default AbstractRouter;
