import express from 'express';

import { AuthRoutes } from './auth.routes';
import { DepartmentRoute } from './department.routes';
import { EntityRoute } from './entity.routes';

const router = express.Router();
router.use('/auth', AuthRoutes);
router.use('/entities', EntityRoute);
router.use('/departments', DepartmentRoute);

export { router as V1Routes };
