import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { ContentManagementService } from '../services';

class ContentManagementController {
  static async getContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getEntities(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async CreateContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getEntities(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getEntity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.updateEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { ContentManagementController };
