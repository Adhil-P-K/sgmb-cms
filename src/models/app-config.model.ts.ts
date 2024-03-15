export interface AppConfig {
  uiBase: string | undefined;
  higherManagementEmail: string | undefined;
  totalAllowedEntityUsers: number;
  httpProxy: string | undefined;
  NODE_ENV: string | undefined;
  app: {
    port: string | undefined;
    host: string | undefined;
  };
  db: {
    database: string | undefined;
    user: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
  };
  jwt: {
    authTokenSecret: string | undefined;
    authTokenLife: string | undefined;
  };
  smtp: {
    user: string | undefined;
    password: string | undefined;
    host: string | undefined;
    port: string | undefined;
  };
  reCaptcha: {
    secret: string | undefined;
  };
  isloginVerificationEnabled: boolean;
  loginVerificationOTPExpirationDuration: string | undefined;
  passwordRecoveryTokenExpirationDuration: string | undefined;
}
