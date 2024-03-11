import { getDb } from './';

class UserRepository {
  static async ReadUser(query: object) {
    const db = getDb();
    try {
      return await db.users.findOne(query);
    } catch (error) {
      throw error;
    }
  }
}
export { UserRepository };
