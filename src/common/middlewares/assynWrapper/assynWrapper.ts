import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../../utils/errors/customError';
import ValidationErr from '../../utils/errors/validationError';

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class AssyncWrapper {
  // controller asyncwrapper
  public wrap(cb: Func) {
    const middleware = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const errors = validationResult(req);

        /**
         * throw error if there are any invalid inputs
         */
        console.log(errors.array());
        if (!errors.isEmpty()) {
          throw new ValidationErr(errors);
        }

        await cb(req, res, next);
      } catch (err: any) {
        if (err.code === 'ER_BAD_FIELD_ERROR') {
          return next(new CustomError(err.sqlMessage, 400, 'Bad field error'));
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          const str = (err.sqlMessage as string)
            .split(' FOREIGN KEY ')[1]
            .slice(0, 50)
            .split('`')[1];

          return next(
            new CustomError(`Plese provide a valid ${str}`, 400, 'Bad ID')
          );
        }

        if (err.name === 'TokenExpiredError') {
          return next(
            new CustomError(
              'The token you provided has been expired',
              400,
              'Token expired'
            )
          );
        }

        next(new CustomError(err.message, err.status, err.type));
      }
    };

    return middleware;
  }
}

export default AssyncWrapper;
