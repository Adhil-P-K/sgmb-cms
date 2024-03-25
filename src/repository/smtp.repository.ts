import { getDb } from './';

class SmtpRepository {
  static async readSmtp(query: object) {
    const db = getDb();
    try {
      const defaultData = await db.smtp.findOne(query);
      if (!defaultData) {
        await db.smtp.insertOne({
          user: '',
          password: '',
          host: '',
          port: 0,
          from_address: '',
          createdAt: new Date(),
          isDefault: true,
        });
        return await db.smtp.findOne(query);
      } else {
        return defaultData;
      }
    } catch (error) {
      throw error;
    }
  }
  static async createSmtp(payload: object) {
    const db = getDb();
    try {
      return await db.smtp.insertOne(payload);
    } catch (error) {
      throw error;
    }
  }
  static async UpdateSm(query: object, skips = 0, limit = 10) {
    const db = getDb();
    try {
      return await db.syslogs.find(query).sort({ createdAt: -1 }).skip(skips).limit(limit).toArray();
    } catch (error) {
      throw error;
    }
  }
}

export { SmtpRepository };
