import { Application } from "express";
import AuthRouter from "../main/router/v1/auth.router";
import CommonRouter from "../main/router/v1/common.router";

class Routes {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public route() {
    // user auth router
    this.app.use("/api/v1/auth", new AuthRouter().routers);

    // common router

    this.app.use("/api/v1/common", new CommonRouter().routers);
  }
}

export default Routes;
