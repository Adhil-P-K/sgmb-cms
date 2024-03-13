import {
  Request,
  Response,
} from 'express';
import { NextFunction } from 'express-serve-static-core';

import {
  fileUpload,
  isValidFile,
} from '../middlewares';
import {
  EntityRepository,
  UserRepository,
} from '../repository';
import { validateJson } from '../schemas';
import {
  Common,
  CustomError,
  EntityStatus,
} from '../utils';

class EntityService {
  static async uploadEntityLogoHandler(req: Request, res: Response, next: NextFunction) {
    const destination = 'sgmb/files/entities';
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
            return next(new CustomError(400, Common.translate('entitylogoerror', query?.lang as string)));
          }
        }
        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
  static async getEntities(req: Request) {
    const { query } = req;
    const filterQuery: { status?: string } = {};
    try {
      const payload = {
        page: Number(query.page) || 1,
        size: Number(query.size) || 10,
      };
      const currentPage = payload.page;
      const perPage = payload.size;
      const skips = (currentPage - 1) * perPage;
      if (query.status) {
        filterQuery['status'] = Common.mongoSanitize(query.status);
      }
      const totalEventDocs = await EntityRepository.readEntitiesCount(filterQuery);
      const totalPages = Math.ceil(totalEventDocs / perPage);
      const entityDocs = await EntityRepository.readEntities(filterQuery, skips, perPage);
      return {
        currentPage,
        perPage,
        totalCount: totalEventDocs,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages ? true : false,
        hasPreviousPage: currentPage !== 1,
        data: entityDocs,
      };
    } catch (error) {
      throw error;
    }
  }
  static async getEntity(req: Request) {
    const { query, params } = req;
    try {
      const payload = {
        entityId: params.entityId,
      };
      const schemaResult = validateJson('getEntityReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const entityDoc = await EntityRepository.readEntity(Common.getId(payload.entityId));
      const entityUsers = await UserRepository.readUsers({
        entityId: Common.getId(payload.entityId),
      });

      return {
        message: Common.translate('entityretrivedsuccess', query?.lang as string),
        data: { entity: entityDoc, Users: entityUsers },
      };
    } catch (error) {
      throw error;
    }
  }
  static async updateEnity(req: Request) {
    const { body, params, query, file } = req;
    try {
      const payload = {
        entityId: params.entityId,
        name: body.name,
        name_ar: body.name_ar,
        email: body.email,
        domain: body.email.split('@')[1],
        countryCode: parseInt(body.countryCode),
        phoneNumber: parseInt(body.phoneNumber),
      };
      const schemaResult = validateJson('EntityUpdateReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      if (!file) {
        throw new CustomError(400, Common.translate('entitylogomissing', query?.lang as string));
      }
      const existingEntityDoc = await EntityRepository.readEntity({
        domain: Common.mongoSanitize(payload.domain),
      });
      if (existingEntityDoc && existingEntityDoc._id != payload.entityId) {
        if (existingEntityDoc.status === EntityStatus.APPROVED) {
          throw new CustomError(409, Common.translate('entityalreadyregistered', query?.lang as string));
        }
        if (existingEntityDoc.status === EntityStatus.PENDING) {
          throw new CustomError(409, Common.translate('entitywaitingapproval', query?.lang as string));
        }
        if (existingEntityDoc.status === EntityStatus.REJECTED) {
          throw new CustomError(409, Common.translate('entityalreadyrejected', query?.lang as string));
        }
      }
      const entityDoc = await EntityRepository.updateEntity(
        { _id: Common.getId(payload.entityId) },
        {
          $set: {
            name: Common.sanitize(payload.name),
            email: Common.sanitize(payload.email),
            domain: Common.sanitize(payload.domain),
            countryCode: payload.countryCode,
            phoneNumber: payload.phoneNumber,
            logo: {
              src: file.path,
              fileName: file.originalname,
              mimeType: file.mimetype,
            },
            t: {
              ar: {
                name: Common.sanitize(payload.name_ar),
              },
            },
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' },
      );
      return {
        message: Common.translate('entityupdatesuccess', query?.lang as string),
        data: entityDoc,
      };
    } catch (error) {
      throw error;
    }
  }
  static async getSubEnity(req: Request) {
    const { query, params } = req;
    try {
      const payload = {
        subEntityId: params.subentityId,
      };
      const schemaResult = validateJson('getSubEntityReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const userDocs = await UserRepository.readUser({
        _id: Common.getId(payload.subEntityId),
      });
      return {
        data: userDocs,
      };
    } catch (error) {
      throw error;
    }
  }
  static async updateSubEnity(req: Request) {
    const { query, params, body } = req;
    try {
      const payload = {
        subEntityId: params.subentityId,
        email: body.email,
      };
      const schemaResult = validateJson('UpdateSubEntityReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const userDocs = await UserRepository.readUser({
        _id: Common.getId(payload.subEntityId),
      });
      if (!userDocs) {
        throw new CustomError(404, Common.translate('entitynotfound', query?.lang as string));
      }
      const entityDoc = await EntityRepository.readEntity({
        _id: Common.getId(userDocs.entityId),
      });
      if (!entityDoc) {
        throw new CustomError(401, Common.translate('authorizationerror', query?.lang as string));
      }
      const domain = payload.email.split('@')[1];
      if (domain !== entityDoc.domain) {
        throw new CustomError(400, Common.translate('entitynewuserinvalidorganizationerror', query?.lang as string));
      }
      const existingUserDoc = await UserRepository.readUser({
        email: Common.mongoSanitize(payload.email),
      });
      if (existingUserDoc) {
        throw new CustomError(400, Common.translate('userexistwithemail', query?.lang as string));
      }

      const userNewDocs = await UserRepository.updateUser(
        { _id: Common.getId(payload.subEntityId) },
        { $set: { email: payload.email, updatedAt: new Date() } },
        { returnDocument: 'after' },
      );
      return {
        message: Common.translate('usercreatesuccess', query?.lang as string),
        data: { userNewDocs },
      };
    } catch (error) {
      throw error;
    }
  }
}

export { EntityService };
