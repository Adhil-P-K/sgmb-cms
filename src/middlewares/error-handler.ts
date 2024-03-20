import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  Common,
  CustomError,
} from '../utils';

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  console.log(err, 'error midlleware');
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      stack: process.env.NODE_ENV !== 'prod' ? err.stack : undefined,
    });
  }
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: Common.translate('unhandlederror', query?.lang as string),
    stack: process.env.NODE_ENV === 'dev' ? err.stack : undefined,
  });
}
