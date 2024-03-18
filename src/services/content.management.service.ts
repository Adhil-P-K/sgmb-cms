import {
  NextFunction,
  Request,
  Response,
} from 'express';

class ContentManagementService {
  static async uploadEntityLogoHandler(req: Request, res: Response, next: NextFunction) {}
  static async getEntities(req: Request) {}
  static async getEntity(req: Request) {}
  static async updateEnity(req: Request) {}
  static async getSubEnity(req: Request) {}
  static async updateSubEnity(req: Request) {}
}
export { ContentManagementService };
