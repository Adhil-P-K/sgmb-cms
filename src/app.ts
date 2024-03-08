import express from 'express';
import { createServer } from 'http';

import { V1Routes } from './routes/v1';

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/sgmb", express.static("sgmb"));
app.use("/api/v1", V1Routes);

httpServer.listen(3002, () => {
  console.log("server is running in port 3002");
});
