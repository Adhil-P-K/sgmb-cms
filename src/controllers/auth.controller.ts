import {
  NextFunction,
  Request,
  Response,
} from 'express';

class AuthController {
  static async LoginHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const response = "we";
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export { AuthController };
