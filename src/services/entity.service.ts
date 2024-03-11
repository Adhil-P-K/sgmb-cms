import { Request } from 'express';

import { EntityRepository } from '../repository';
import { Common } from '../utils';

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
    try {
    } catch (error) {
      throw error;
    }
  }
  static async updateEnity(req: Request) {
    try {
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
