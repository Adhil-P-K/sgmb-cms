import { getDb } from './';

class ContentRepository {
  static async createContent(payload: object) {
    const db = getDb();
    try {
      return await db.contents.insertOne(payload);
    } catch (error) {
      throw error;
    }
  }
  static async readContent(query: any) {
    const db = getDb();
    try {
      return await db.contents.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  static async readContents(query: object, skips = 0, limit = 10) {
    const db = getDb();
    try {
      return await db.contents.find(query).sort({ createdAt: -1 }).skip(skips).limit(limit).toArray();
    } catch (error) {
      throw error;
    }
  }
  static async readContentsCount(query: object) {
    const db = getDb();
    try {
      return await db.contents.countDocuments(query);
    } catch (error) {
      throw error;
    }
  }
  static async updateContent(query: object, payload: any, options: any) {
    const db = getDb();
    try {
      return await db.contents.findOneAndUpdate(query, payload, options);
    } catch (error) {
      throw error;
    }
  }
  static async readContentJson() {
    const db = getDb();
    try {
      return await db.contents.find().toArray();
    } catch (error) {
      throw error;
    }
  }
}

export { ContentRepository };
