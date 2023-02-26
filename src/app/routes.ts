import { Application } from "express";
import AuthRouter from "../main/router/v1/auth.router";

class Routes {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public route() {
    // user auth router
    this.app.use("/api/v1/auth", new AuthRouter().routers);
  }
}

export default Routes;
