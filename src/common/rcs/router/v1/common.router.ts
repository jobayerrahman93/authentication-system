import AbstractRouter from "../../../../abstracts/abstractRouter";
import CommonController from "../../controller/common.controller";

class CommonRouter extends AbstractRouter {
  private CommonController = new CommonController();
  constructor() {
    super();
    this.callRouter();
  }
  private callRouter() {}
}

export default CommonRouter;
