import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import config from "../common/config/config";
import Notfound from "../common/middlewares/mini/notFoundRoute";
import { origin } from "./miscellaneous/constants";
import Routes from "./routes";

class App {
  public app: Application;
  private origin: string[] = origin;
  private port: number;

  constructor() {
    this.port = config.PORT || 9000;
    this.app = express();
    this.initRouters();
    this.initMiddlewares();
    this.allRoutes();
    this.notFoundRouter();
  }

  // listen app
  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server is listening at port " + this.port);
    });
  }

  // init middlewares
  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors({ origin: this.origin, credentials: true }));
  }

  // init routers
  private initRouters() {
    this.app.get("/", (_req: Request, res: Response) => {
      res.send("Ostad server is running...");
    });
  }

  // all routes call
  private allRoutes() {
    new Routes(this.app).route();
  }

  // not found route
  private notFoundRouter() {
    this.app.use("*", new Notfound()[404]);
  }
}
export default App;
