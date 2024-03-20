import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { ContentManagementService } from '../services';

class ContentManagementController {
  static async CreateContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.createContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getContents(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.updateContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { ContentManagementController };
