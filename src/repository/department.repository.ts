import { getDb } from './';

class DepartmentRepository {
  static async readDepartment(query: object) {
    const db = getDb();
    try {
      return await db.departments.findOne(query);
    } catch (error) {
      throw error;
    }
  }
  static async readDepartments(query?: object) {
    const db = getDb();
    try {
      return await db.departments.find(query).toArray();
    } catch (error) {
      throw error;
    }
  }

  static async updateDepartment(query: object, payload: object, options?: object) {
    const db = getDb();
    try {
      return await db.departments.findOneAndUpdate(query, payload, options);
    } catch (error) {
      throw error;
    }
  }
}
export { DepartmentRepository };
