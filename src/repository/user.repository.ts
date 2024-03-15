import { User } from '../models';
import { getDb } from './';

class UserRepository {
  static async readUser(query: object): Promise<User | null> {
    const db = getDb();
    try {
      return await db.users.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  static async readUsers(query: object, skips = 0, limit = 10) {
    const db = getDb();
    try {
      return await db.users
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(limit)
        .project({
          passwordSalt: 0,
          passwordHash: 0,
        })
        .toArray();
    } catch (error) {
      throw error;
    }
  }
  static async updateUser(query: object, payload: object, options?: object) {
    const db = getDb();
    try {
      return await db.users.findOneAndUpdate(query, payload, options);
    } catch (error) {
      throw error;
    }
  }
}
export { UserRepository };
