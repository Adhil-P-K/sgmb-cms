import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { EntityService } from '../services';

class EntityController {
  static async readEntitiesHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await EntityService.readEntities(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async readEntityHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await EntityService.readEntity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateEnityHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await EntityService.updateEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async readSubEnityHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await EntityService.readSubEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateSubEnityHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await EntityService.updateSubEnity(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export { EntityController };
