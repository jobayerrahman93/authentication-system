import abstractController from "../../../abstracts/abstractController";
import CommonServices from "../services/common.services";

class CommonController extends abstractController {
  private CommonServices = new CommonServices();
  constructor() {
    super();
  }
}

export default CommonController;
