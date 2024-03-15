import express, { Request, Response } from 'express';

import { AuthController } from '../../controllers';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send({ hai: 'hello' });
});
router.post('/login', AuthController.LoginHandler);

export { router as AuthRoutes };
