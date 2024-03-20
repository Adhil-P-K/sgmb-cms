import { NextFunction, Request, Response } from 'express';

import { DepartmentService } from '../services';

class DepartmentController {
  static async getDepartmentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DepartmentService.departmentHandler(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getDepartmentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DepartmentService.readDepartment(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateDepartmentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await DepartmentService.updatedDepartmentHandler(req);
      return res.status(200).json(response);
    } catch (error) {
      // if (!success) {
      //   Common.removeFile({ path: file.path });
      // }
      return next(error);
    }
  }
}
export { DepartmentController };
