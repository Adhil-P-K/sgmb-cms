import { Request } from 'express';
import fs from 'fs';
import path from 'path';

import { ContentPayload } from '../models';
import { ContentRepository } from '../repository/content.management.repository';
import { validateJson } from '../schemas';
import { Common, CustomError } from '../utils';

class ContentManagementService {
  static async UpdatedLanguageJson() {
    try {
      const data = await ContentRepository.readContentJson();
      const englishData: { [key: string]: string } = {};
      const arabicData: { [key: string]: string } = {};
      data.forEach((entry: any, index: number) => {
        englishData[entry.key] = entry.content_en;
        arabicData[entry.key] = entry.content_ar;
      });
      const englishJsonData = JSON.stringify({ translation: englishData }, null, 2);
      const arabicJsonData = JSON.stringify({ translation: arabicData }, null, 2);
      fs.writeFileSync(path.join(__dirname, '../../sgmb/files', 'en.json'), englishJsonData);
      fs.writeFileSync(path.join(__dirname, '../../sgmb/files', 'ar.json'), arabicJsonData);
    } catch (error) {
      throw error;
    }
  }
  static async createContent(req: Request) {
    const { query, body } = req;
    try {
      const payload = {
        key: Common.generateSlug(body.key),
        content_en: body.content_en,
        content_ar: body.content_ar,
        variables: Array.isArray(body.variables) ? body.variables : [body.variables],
      };
      const schemaResult = validateJson('ContnetCreateReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const existingContentDoc = await ContentRepository.readContent({
        key: Common.mongoSanitize(payload.key),
      });
      if (existingContentDoc && existingContentDoc.key === payload.key) {
        throw new CustomError(409, Common.translate('entityalreadyregistered', query?.lang as string));
      }
      const newPayload: ContentPayload = {
        key: payload.key,
        content_en: payload.content_en,
        content_ar: payload.content_ar,
        createdAt: new Date(),
      };
      if (payload.variables) {
        newPayload.variables?.push(payload.variables);
      }

      const conetntDoc = await ContentRepository.createContent(newPayload);
      this.UpdatedLanguageJson();
      return {
        message: 'successfully created content',
        data: conetntDoc,
      };
    } catch (error) {
      throw error;
    }
  }
  static async getContents(req: Request) {
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
      const totalContentDocs = await ContentRepository.readContentsCount(filterQuery);
      const totalPages = Math.ceil(totalContentDocs / perPage);
      const ContentDocs = await ContentRepository.readContents(filterQuery, skips, perPage);

      return {
        message: 'succesfully retrived contents',
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
  static async getContent(req: Request) {
    const { query, params } = req;
    try {
      const payload = {
        contentId: params.contentId,
      };
      const schemaResult = validateJson('getContentReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const ContentDoc = await ContentRepository.readContent(Common.getId(payload.contentId));

      return { ContentDoc };
    } catch (error) {
      throw error;
    }
  }
  static async updateContent(req: Request) {
    const { query, body, params } = req;
    try {
      const payload = {
        contentId: params.contentId,
        content_en: body.content_en,
        content_ar: body.content_ar,
        variables: body.variables,
      };

      const schemaResult = validateJson('UpdateContentReq', payload);
      if (!schemaResult.result) {
        throw new CustomError(400, Common.translate('schemaerror', query?.lang as string), schemaResult.errors);
      }
      const contentDoc = await ContentRepository.updateContent(
        { _id: Common.getId(payload.contentId) },
        {
          $set: {
            content_en: Common.sanitize(payload.content_en),
            content_ar: Common.sanitize(payload.content_ar),
            variables: Common.sanitize(payload.variables),
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' },
      );
      this.UpdatedLanguageJson();
      return {
        message: 'Successfully updated content',
        data: contentDoc,
      };
    } catch (error) {
      throw error;
    }
  }
}
export { ContentManagementService };
