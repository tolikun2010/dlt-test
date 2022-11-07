require('dotenv').config({ path: '../.env' });

export const Config = {
  PORT: parseInt(process.env.PORT, 10),

  MONGODB_CONNSTRING: process.env.MONGODB_CONNSTRING,

  REDIS_URL: process.env.REDIS_URL,

  CORS_WHITELIST: process.env.CORS_WHITELIST,
};
