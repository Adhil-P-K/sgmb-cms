import express from 'express';

import { AuthRoutes } from './auth.routes';
import { ContentManagementRoute } from './content.management.routes';
import { DepartmentRoute } from './department.routes';
import { EntityRoute } from './entity.routes';
import { HighermanagementRoute } from './highermanagement.routes';
import { LogRoute } from './log.routes';
import { SmtpRoute } from './smtp.routes';

const router = express.Router();
router.use('/auth', AuthRoutes);
router.use('/entities', EntityRoute);
router.use('/departments', DepartmentRoute);
router.use('/highermanagement', HighermanagementRoute);
router.use('/content', ContentManagementRoute);
router.use('/log', LogRoute);
router.use('/smtp', SmtpRoute);

export { router as V1Routes };
