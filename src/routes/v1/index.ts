import express from 'express';

import { AuthRoutes } from './auth.routes';

const router = express.Router();
router.use("/auth", AuthRoutes);

export { router as V1Routes };
