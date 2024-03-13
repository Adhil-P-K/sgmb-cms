import express from 'express';

import { DepartmentController } from '../../controllers';
import { DepartmentService } from '../../services';

const router = express.Router();

router.get('/', DepartmentController.getDepartmentHandler);
router.patch(
  '/:departmentId',
  DepartmentService.uploadDepartmentLogoHandler,
  DepartmentController.updateDepartmentHandler,
);

export { router as DepartmentRoute };
