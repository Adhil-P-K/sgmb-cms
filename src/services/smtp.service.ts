import { Request } from 'express';

import { SmtpRepository } from '../repository';
import { LogRepository } from '../repository/log.repository';
import { validateJson } from '../schemas';
import { Common, CustomError } from '../utils';

class SmptService {
  static async getSmtp(req: Request) {
    const { query } = req;
    try {
      let smtpDoc = await SmtpRepository.readSmtp({ isDefault: true });
      if (!smtpDoc) {
        await SmtpRepository.createSmtp({
          user: '',
          password: '',
          host: '',
          port: 0,
          from_address: '',
          createdAt: new Date(),
          isDefault: true,
        });
        smtpDoc = await SmtpRepository.readSmtp({ isDefault: true });
      }
      return {
        message: 'succesfully retrived smtp',
        data: smtpDoc,
      };
    } catch (error) {
      throw error;
    }
  }
  static async UpdateSmtp(req: Request) {
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
export { SmptService };
