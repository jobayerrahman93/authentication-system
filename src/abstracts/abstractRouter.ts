import { Router } from "express";

abstract class AbstractRouter {
  readonly routers = Router();
}

export default AbstractRouter;
