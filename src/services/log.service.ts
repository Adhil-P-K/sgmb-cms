import { Request } from 'express';

import { LogRepository } from '../repository/log.repository';
import { validateJson } from '../schemas';
import { Common, CustomError } from '../utils';

class LogService {
  static async getLogs(req: Request) {
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
      const totalContentDocs = await LogRepository.readLogsCount(filterQuery);
      const totalPages = Math.ceil(totalContentDocs / perPage);
      const ContentDocs = await LogRepository.readLogs(filterQuery, skips, perPage);

      return {
        message: 'succesfully retrived logs',
        currentPage,
        perPage,
        totalCount: totalContentDocs,
        totalPages: totalPages,
        hasNextPage: currentPage < totalPages ? true : false,
        hasPreviousPage: currentPage !== 1,
        data: ContentDocs,
      };
    } catch (error) {
      throw error;
    }
  }
  static async getLog(req: Request) {
    const { query, params } = req;
    try {
      const payload = {
        logId: params.logId,
      };
      const schemaResult = validateJson('getLogReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const LogDoc = await LogRepository.readLog(Common.getId(payload.logId));

      return { LogDoc };
    } catch (error) {
      throw error;
    }
  }
}
export { LogService };
