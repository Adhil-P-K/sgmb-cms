import { Request } from 'express';

import { UserRepository } from '../repository';
import { validateJson } from '../schemas';
import {
  Common,
  CustomError,
  UserLevel,
} from '../utils';

class HighermnagementService {
  static async getHighermanagementHandler(req: Request) {
    try {
      const highermanagementDocs = await UserRepository.readUsers({
        level: UserLevel.HIGHER_MANAGEMENT,
      });
      return { highermanagementDocs };
    } catch (error) {
      throw error;
    }
  }
  static async updateHighermanagementHandler(req: Request) {
    const { params, query, body } = req;
    try {
      const payload = {
        highermnagementId: params.userId,
        email: body.email,
      };
      const schemaResult = validateJson('UpdateHighermanagementReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const updateDepartmentPayload = {
        email: Common.sanitize(payload.email),
      };
      const updatedDepartmentDoc = await UserRepository.updateUser(
        { _id: Common.getId(payload.highermnagementId) },
        { $set: updateDepartmentPayload },
        { returnDocument: 'after' },
      );
      return {
        message: Common.translate('departmentupdatesuccess', query?.lang as string),
        data: { _id: payload.highermnagementId, ...updateDepartmentPayload },
      };
    } catch (error) {
      throw error;
    }
  }
}
export { HighermnagementService };
