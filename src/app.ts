import express from 'express';
import { createServer } from 'http';

import { appConfig } from './config';
import { initDb } from './repository';
import { V1Routes } from './routes/v1';

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/sgmb", express.static("sgmb"));
app.use("/api/v1", V1Routes);

const connectionUrl: string = `mongodb://${appConfig.db.user}:${appConfig.db.password}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.database}`;
initDb(connectionUrl, async (error: Error) => {
  if (error) {
    console.log(`Error Connecting to MongoDB: ${error}`);
    process.exit(1);
  }
  console.log("NodeJS Api Connected to MongoDB.");

  httpServer.listen(appConfig.app.port, () => {
    console.log("server is running in port 3002");
  });
});
