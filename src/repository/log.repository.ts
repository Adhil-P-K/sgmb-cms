import { getDb } from './';

class LogRepository {
  static async readLog(query: any) {
    const db = getDb();
    try {
      return await db.syslogs.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  static async readLogs(query: object, skips = 0, limit = 10) {
    const db = getDb();
    try {
      return await db.syslogs.find(query).sort({ createdAt: -1 }).skip(skips).limit(limit).toArray();
    } catch (error) {
      throw error;
    }
  }
  static async readLogsCount(query: object) {
    const db = getDb();
    try {
      return await db.syslogs.countDocuments(query);
    } catch (error) {
      throw error;
    }
  }
}

export { LogRepository };
