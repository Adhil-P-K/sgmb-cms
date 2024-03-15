export interface User {
  _id: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  departmentId: string;
  createdAt: Date;
  level: string;
  role: string;
  status: string;
  loginVerificationOTP?: string | null;
  loginVerificationOTPExpireAt?: Date | null;
  entityId: string;
}
