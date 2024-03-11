import express from 'express';

import { AuthRoutes } from './auth.routes';
import { EntityRoute } from './entity.routes';

const router = express.Router();
router.use("/auth", AuthRoutes);
router.use("/enities", EntityRoute);

export { router as V1Routes };
