import { NextFunction, Request, Response } from 'express';

import { fileUpload, isValidFile } from '../middlewares';
import { DepartmentRepository, UserRepository } from '../repository';
import { validateJson } from '../schemas';
import { Common, CustomError, UserRole } from '../utils';

class DepartmentService {
  static async uploadDepartmentLogoHandler(req: Request, res: Response, next: NextFunction) {
    const destination = 'sgmb/files/departments';
    const upload = fileUpload(destination).single('logo');
    return upload(req, res, function (error) {
      if (error) {
        return next(error);
      }
      const { file, query } = req;
      try {
        if (file) {
          const isValid = isValidFile(file, ['image/jpg', 'image/jpeg', 'image/png'], 10000000);
          if (!isValid) {
            return next(new CustomError(400, Common.translate('departmentlogoerror', query?.lang as string)));
          }
        }
        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
  static async departmentHandler(req: Request) {
    try {
      const departmentDocs = await DepartmentRepository.readDepartments();
      return { departmentDocs };
    } catch (error) {
      throw error;
    }
  }
  static async readDepartment(req: Request) {
    const { query, params } = req;
    try {
      const payload = {
        deaprtmentId: params.departmentId,
      };
      const schemaResult = validateJson('readDepartmentReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const newPayload = {
        _id: Common.getId(payload.deaprtmentId),
      };
      const departmentDocs = await DepartmentRepository.readDepartment(newPayload);
      return { departmentDocs };
    } catch (error) {
      throw error;
    }
  }
  static async updatedDepartmentHandler(req: Request) {
    const { body, params, file, query } = req;
    let success = false;
    try {
      const payload = {
        departmentId: params.departmentId,
        email: body.email,
        countryCode: parseInt(body.countryCode),
        phoneNumber: parseInt(body.phoneNumber),
      };
      const schemaResult = validateJson('UpdateDepartmentReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      if (!file) {
        throw new CustomError(400, Common.translate('departmentlogomissing', query?.lang as string));
      }
      const filterQuery = {
        _id: Common.getId(payload.departmentId),
      };
      const updateDepartmentPayload = {
        email: Common.sanitize(payload.email),
        countryCode: payload.countryCode,
        phoneNumber: payload.phoneNumber,
        logo: {
          src: file.path,
          fileName: file.originalname,
          mimeType: file.mimetype,
        },
      };
      const updatedDepartmentDoc = await DepartmentRepository.updateDepartment(
        filterQuery,
        { $set: updateDepartmentPayload },
        { returnDocument: 'before' },
      );
      if (updatedDepartmentDoc) {
        success = true;
        UserRepository.updateUser(
          {
            departmentId: Common.getId(payload.departmentId),
            role: UserRole.ADMIN,
          },
          { $set: { email: updateDepartmentPayload.email } },
        );
        Common.removeFile({ path: updatedDepartmentDoc.logo.src });
      }
      return {
        message: Common.translate('departmentupdatesuccess', query?.lang as string),
        data: { _id: payload.departmentId, ...updateDepartmentPayload },
      };
    } catch (error) {
      throw error;
    }
  }
}
export { DepartmentService };
