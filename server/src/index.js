/* eslint-disable no-console */
import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { Config } from './config/index';
import { Redis } from './services';

(async function start() {
  const server = http.createServer(app);
  // mongodb connection
  mongoose
    .connect(Config.MONGODB_CONNSTRING, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

  // redis connection
  await Redis.init();

  // launch server
  server.listen(Config.PORT, () => {
    console.log(`Server listened on port: ${Config.PORT}`);
  });
}()).catch((error) => {
  console.error(error);
  process.exit(0);
});
