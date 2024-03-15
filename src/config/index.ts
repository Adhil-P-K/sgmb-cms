import dotenv from 'dotenv';

import { AppConfig } from '../models';

// if (process.env.NODE_ENV !== "prod") {
//   dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
// } else {
//   dotenv.config();
// }
dotenv.config();
const appConfig: AppConfig = {
  uiBase: process.env.UI_BASE,
  higherManagementEmail: process.env.HIGHER_MANAGEMENT_EMAIL,
  totalAllowedEntityUsers: 2,
  httpProxy: process.env.HTTP_PROXY,
  NODE_ENV: process.env.NODE_ENV,
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  jwt: {
    authTokenSecret: process.env.AUTH_TOKEN_SECRET,
    authTokenLife: process.env.AUTH_TOKEN_LIFE,
  },
  smtp: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
  },
  reCaptcha: {
    secret: process.env.RECAPTCHA_SECRET_KEY,
  },

  isloginVerificationEnabled: process.env.IS_LOGIN_VERIFICATION_ENABLED === 'true' ? true : false,

  loginVerificationOTPExpirationDuration: process.env.LOGIN_VERIFICATION_OTP_EXPIRATION_DURATION,
  passwordRecoveryTokenExpirationDuration: process.env.PASSWORD_RECOVERY_TOKEN_EXPIRATION_DURATION,
};

export { appConfig };
