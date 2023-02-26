import AssyncWrapper from '../common/middlewares/assynWrapper/assynWrapper';
import CustomError from '../common/utils/errors/customError';

abstract class abstractController {
  protected assyncWrapper;

  constructor() {
    this.assyncWrapper = new AssyncWrapper();
  }
  protected error(message?: string, status?: number, type?: string) {
    throw new CustomError(
      message || 'Something went wrong',
      status || 500,
      type || 'Internal server Error'
    );
  }
}

export default abstractController;
