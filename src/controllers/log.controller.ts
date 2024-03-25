import { NextFunction, Request, Response } from 'express';

import { LogService } from '../services';

class logController {
  static async getLogsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LogService.getLogs(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getLogHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LogService.getLog(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { logController };
