import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../database/model/custom-error';





function handleError(
    err: TypeError | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let customError = err;
  
    if (!(err instanceof CustomError)) {
       customError = new CustomError(
        'Oh no, this is embarrasing. We are having troubles '
      );
    }
   

    res.status((customError as CustomError).status).send(customError);
  };
  
  export default handleError;