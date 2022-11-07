import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Config } from './config/index';
import { ErrorHandler } from './middlewares';
import { linkRouter } from './routes';

const app = express();

// configuration section
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const corsOptions = {
  origin: Config.CORS_WHITELIST.split(','),
  optionsSuccessStatus: 200,
  'Access-Control-Allow-Credentials': true,
};
app.use(cors(corsOptions));
app.use(morgan('tiny'));

// app routing
app.use('/api', linkRouter);

// health check request
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// app error handling
app.use(ErrorHandler);

export default app;
