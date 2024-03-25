import express, { Request, Response } from 'express';

import { logController } from '../../controllers';

const router = express.Router();
router.get('/contentmanagement', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.get('/', logController.getLogsHandler);
router.get('/:logId', logController.getLogHandler);

export { router as LogRoute };
