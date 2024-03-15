import { NextFunction, Request, Response } from 'express';

import { EntityService } from '../services';

class EntityController {
  static async getEntitiesHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EntityService.getEntities(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getEntityHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EntityService.getEntity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateEnityHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EntityService.updateEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getSubEnityHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EntityService.getSubEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateSubEnityHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EntityService.updateSubEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export { EntityController };
