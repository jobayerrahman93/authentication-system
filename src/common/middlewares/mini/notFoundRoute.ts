import { NextFunction, Request, Response } from 'express';
import CustomError from '../../utils/errors/customError';

class Notfound {
  public 404(_req: Request, _res: Response, next: NextFunction) {
    next(new CustomError('Cannot find the route', 404, 'Invalid route'));
  }
}

export default Notfound;
