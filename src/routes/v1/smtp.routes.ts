import express, { Request, Response } from 'express';

import { SmtpController } from '../../controllers';

const router = express.Router();
router.get('/contentmanagement', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.get('/', SmtpController.getSmtpHandler);
router.patch('/', SmtpController.UpdateSmptHandler);

export { router as SmtpRoute };
