import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import { appConfig } from './config';
import { ErrorHandler } from './middlewares';
import { initDb } from './repository';
import { V1Routes } from './routes/v1';
import { initAjv } from './schemas';

const app = express();

const httpServer = createServer(app);
app.use(
  cors({
    origin: ['*', 'http://192.168.5.23:5173', 'http://localhost:5173'],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/sgmb', express.static('sgmb'));
app.use('/api/v1', V1Routes);
app.use(ErrorHandler);
const ip: any = appConfig.app.host;

const connectionUrl: string = `mongodb://${appConfig.db.user}:${appConfig.db.password}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.database}`;
initDb(connectionUrl, async (error: Error) => {
  console.log(connectionUrl);

  if (error) {
    console.log(`Error Connecting to MongoDB: ${error}`);
    process.exit(1);
  }
  console.log('NodeJS Api Connected to MongoDB.');

  await initAjv();

  httpServer.listen(appConfig.app.port, ip, () => {
    console.log('server is running in port 3002');
  });
});
