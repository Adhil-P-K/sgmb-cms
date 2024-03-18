import { getDb } from './';

class HighermanagementRepository {
  static async readHighermanagemnts(query: object) {
    const db = getDb();
    try {
      return await db.users
        .find(query)
        .project({
          passwordSalt: 0,
          passwordHash: 0,
          loginVerificationOTP: 0,
          loginVerificationOTPExpireAt: 0,
        })
        .toArray();
    } catch (error) {
      throw error;
    }
  }
}
export { HighermanagementRepository };
