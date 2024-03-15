import { NextFunction, Response } from 'express';

import { AuthRequest } from '../models/authRequest.model';
import { Common, CustomError } from '../utils';

function isAuth(request: AuthRequest, response: Response, next: NextFunction) {
  console.log(request, 'request auth');
  const { headers, query } = request;
  if (!headers['x-api-key']) {
    return next(new CustomError(401, Common.translate('apikeyrequired', query?.lang as string)));
  }
  try {
    const apiKey = headers['x-api-key'];
    const decodedApiKeys = Array.isArray(apiKey) ? apiKey : [apiKey]; // Ensure it's an array
    decodedApiKeys.forEach((decodedApiKey: string) => {
      // Handle each string in the array
      console.log(decodedApiKey, 'decoded');
      request.user = decodedApiKey;
    });
    return next();
  } catch (error) {
    console.log(error, 'error in this auth');
    return next(new CustomError(401, Common.translate('invalidapikeyformat', query?.lang as string)));
  }
}
// function isHigherManagement(request:AuthRequest, response:Response, next:NextFunction) {
//   const { user, query } = request;
//   if (!user.level || user.level !== UserLevel.HIGHER_MANAGEMENT) {
//     return next(new CustomError(401, Common.translate('authorizationerror', query?.lang as string)));
//   }
//   return next();
// }

export const authmiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req, 'request auth');
  const { headers, query } = req;
  if (!headers['x-api-key']) {
    return next(new CustomError(401, Common.translate('apikeyrequired', query?.lang as string)));
  }
  try {
    const apiKey = headers['x-api-key'];
    const decodedApiKeys = Array.isArray(apiKey) ? apiKey : [apiKey]; // Ensure it's an array
    decodedApiKeys.forEach((decodedApiKey: string) => {
      // Handle each string in the array
      console.log(decodedApiKey, 'decoded');
      req.user = decodedApiKey;
    });
    return next();
  } catch (error) {
    console.log(error, 'error in this auth');
    return next(new CustomError(401, Common.translate('invalidapikeyformat', query?.lang as string)));
  }
};
export { isAuth };
