import express from 'express';

import { HighermanagemntController } from '../../controllers';

const router = express.Router();

router.get('/', HighermanagemntController.getHighermanagementHandler);
router.get('/:highermanagementId', HighermanagemntController.readHigherManagement);
router.patch('/:highermanagementId', HighermanagemntController.updateHighermanagementHandler);

export { router as HighermanagementRoute };
