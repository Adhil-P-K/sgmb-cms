import { Request } from 'express';

import { User } from '../models';
import { UserRepository } from '../repository';
import { validateJson } from '../schemas';
import { Common, CustomError, UserLevel, UserStatus } from '../utils';

class AuthService {
  static async LoginHandlers(req: Request) {
    const { query, body } = req;
    try {
      const payload = { email: body.email, password: body.password };

      const schemaResult = validateJson('LoginReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }

      const userDoc = await UserRepository.readUser({
        email: Common.mongoSanitize(payload.email),
        status: UserStatus.APPROVED,
      });
      if (!userDoc) {
        throw new CustomError(404, Common.translate('usernotfound', query?.lang as string));
      }

      const passwordHash = Common.generateHash(payload.password, userDoc.passwordSalt);
      if (passwordHash !== userDoc.passwordHash) {
        throw new CustomError(404, Common.translate('usernotfound', query?.lang as string));
      }

      let authResultData = null;

      switch (userDoc.level) {
        case UserLevel.HIGHER_MANAGEMENT: {
          authResultData = await this.higherManagementUserLogin(userDoc);
          break;
        }
        default: {
          throw new CustomError(401, Common.translate('authorizationerror', query?.lang as string));
        }
      }

      return {
        status: true,
        statusCode: 200,
        message: Common.translate('loginsuccess', query?.lang as string as string),
        data: { ...authResultData, isLoginVerficationEnabled: false },
      };
      console.log(payload, 'payload');
    } catch (error) {
      throw error;
    }
  }
  static async higherManagementUserLogin(userDoc: User) {
    const authToken = Common.generateAuthToken({
      id: userDoc._id,
      role: userDoc.role,
      level: userDoc.level,
    });

    return {
      authToken,
      user: {
        id: userDoc._id,
        email: userDoc.email,
        role: userDoc.role,
        level: userDoc.level,
      },
    };
  }
}
export { AuthService };
