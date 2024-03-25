import { NextFunction, Request, Response } from 'express';

import { SmptService } from '../services';

class SmtpController {
  static async getSmtpHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await SmptService.getSmtp(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async UpdateSmptHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await SmptService.UpdateSmtp(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { SmtpController };
