require('dotenv').config();

/*
 TODO:
  account is not going to take in bankToken, we need to update this.
 */
const WHITELIST = {
  users: {
    create: ['phoneNumber'],
    verifyCode: ['verificationCode'],
  },
  account: {
    get: ['bankToken'],
  },
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-test',
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  RAVEN_ID: process.env.RAVEN_ID,
  SMS_API_USERNAME: process.env.SMS_API_USERNAME,
  SMS_API_PASSWORD: process.env.SMS_API_PASSWORD,
  NORDEA_CLIENT_ID: process.env.NORDEA_CLIENT_ID,
  NORDEA_CLIENT_SECRET: process.env.NORDEA_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  WHITELIST,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
