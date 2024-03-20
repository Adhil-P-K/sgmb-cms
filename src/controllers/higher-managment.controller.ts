import { NextFunction, Request, Response } from 'express';

import { HighermnagementService } from '../services';

class HighermanagemntController {
  static async getHighermanagementHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await HighermnagementService.getHighermanagementsHandler(req);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async readHigherManagement(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await HighermnagementService.getHighermanagementHandler(req);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateHighermanagementHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await HighermnagementService.updateHighermanagementHandler(req);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { HighermanagemntController };
