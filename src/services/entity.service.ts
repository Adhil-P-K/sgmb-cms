import { Request } from "express";

import { EntityRepository, UserRepository } from "../repository";
import { Common } from "../utils";

class EntityService {
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
        filterQuery["status"] = Common.mongoSanitize(query.status);
      }
      const totalEventDocs = await EntityRepository.readEntitiesCount(
        filterQuery
      );
      const totalPages = Math.ceil(totalEventDocs / perPage);
      const entityDocs = await EntityRepository.readEntities(
        filterQuery,
        skips,
        perPage
      );
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
      const entityDoc = await EntityRepository.readEntity(
        Common.getId(payload.entityId)
      );
      const entityUsers = await UserRepository.readUsers({
        entityId: Common.getId(payload.entityId),
      });

      return {
        message: Common.translate(
          "entityretrivedsuccess",
          query?.lang as string
        ),
        data: { entity: entityDoc, Users: entityUsers },
      };
    } catch (error) {
      throw error;
    }
  }
  static async updateEnity(req: Request) {
    const { body, params, query } = req;
    try {
      const entityId = params.entityId;
      const payload = {
        name: body.name,
        name_ar: body.name_ar,
        email: body.email,
        domain: body.email.split("@")[1],
        countryCode: parseInt(body.countryCode),
        phoneNumber: parseInt(body.phoneNumber),
      };
      // const schemaResult = schema.validateJson("EntityUpdateReq", payload);
      // if (!schemaResult.result) {
      //   throw new CustomError(
      //     400,
      //     Common.translate("schemaerror", query?.lang as string),
      //     schemaResult.errors
      //   );
      // }
      // if (!file) {
      //   throw new CustomError(
      //     400,
      //     Common.translate("entitylogomissing", query?.lang as string)
      //   );
      // }
      // const existingEntityDoc = await EntityRepository.readEntity({
      //   domain: Common.mongoSanitize(payload.domain),
      // });
      // if (existingEntityDoc && existingEntityDoc._id != entityId) {
      //   if (existingEntityDoc.status === EntityStatus.APPROVED) {
      //     throw new CustomError(
      //       409,
      //       Common.translate("entityalreadyregistered", query?.lang as string)
      //     );
      //   }
      //   if (existingEntityDoc.status === EntityStatus.PENDING) {
      //     throw new CustomError(
      //       409,
      //       Common.translate("entitywaitingapproval", query?.lang as string)
      //     );
      //   }
      //   if (existingEntityDoc.status === EntityStatus.REJECTED) {
      //     throw new CustomError(
      //       409,
      //       Common.translate("entityalreadyrejected", query?.lang as string)
      //     );
      //   }
      // }
      // const entityDoc = await EntityRepository.updateEntity(
      //   { _id: Common.getId(entityId) },
      //   {
      //     $set: {
      //       name: Common.sanitize(payload.name),
      //       email: Common.sanitize(payload.email),
      //       domain: Common.sanitize(payload.domain),
      //       countryCode: payload.countryCode,
      //       phoneNumber: payload.phoneNumber,
      //       logo: {
      //         src: file.path,
      //         fileName: file.originalname,
      //         mimeType: file.mimetype,
      //       },
      //       t: {
      //         ar: {
      //           name: Common.sanitize(payload.name_ar),
      //         },
      //       },
      //       updatedAt: new Date(),
      //     },
      //   },
      //   { returnDocument: "after" }
      // );
      return {
        message: Common.translate("entityupdatesuccess", query?.lang as string),
        data: "ij",
      };
    } catch (error) {
      throw error;
    }
  }
  static async getSubEnity(req: Request) {
    try {
    } catch (error) {
      throw error;
    }
  }
  static async updateSubEnity(req: Request) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

export { EntityService };
