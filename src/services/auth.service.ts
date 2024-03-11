import { Request } from 'express';

class AuthService {
  static async LoginHandlers(req: Request) {
    const { query, body } = req;
    try {
      const payload = {
        email: body.email,
        password: body.password,
      };
      console.log(payload, "payload");
    } catch (error) {
      throw error;
    }
  }
}
export { AuthService };
