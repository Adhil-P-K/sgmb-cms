import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { ContentRepository } from '../repository/content.management.repository';
import { ContentManagementService } from '../services';

class ContentManagementController {
  static async test(req: Request, res: Response, next: NextFunction) {
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
      res.send('Data exported successfully!');
    } catch (error) {
      next(error);
    }
  }
  static async CreateContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.createContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getContentsHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getContents(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.getContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateContentHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ContentManagementService.updateContent(req);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
export { ContentManagementController };
