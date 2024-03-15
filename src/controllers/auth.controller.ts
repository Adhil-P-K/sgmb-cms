import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../services';

class AuthController {
  static async LoginHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const response = await AuthService.LoginHandlers(req);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export { AuthController };
