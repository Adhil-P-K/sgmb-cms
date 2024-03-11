import { getDb } from './';

class EntityRepository {
  static async readEntity(query: string) {
    const db = getDb();
    try {
      return await db.entities.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  static async readEntities(query: object, skips = 0, limit = 10) {
    const db = getDb();
    try {
      return await db.entities
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(limit)
        .toArray();
    } catch (error) {
      throw error;
    }
  }
  static async readEntitiesCount(query: object) {
    const db = getDb();
    try {
      return await db.entities.countDocuments(query);
    } catch (error) {
      throw error;
    }
  }
  static async updateEntity(query: any, payload: any, options: any) {
    const db = getDb();
    try {
      return await db.entities.findOneAndUpdate(query, payload, options);
    } catch (error) {
      throw error;
    }
  }
}

export { EntityRepository };
