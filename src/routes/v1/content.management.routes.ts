import express, { Request, Response } from 'express';

import { ContentManagementController } from '../../controllers';

const router = express.Router();
router.get('/contentmanagement', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.post('/', ContentManagementController.CreateContentsHandler);
router.get('/', ContentManagementController.getContentsHandler);
router.get('/:contentId', ContentManagementController.getContentHandler);
router.patch('/:contentId', ContentManagementController.updateContentHandler);
export { router as ContentManagementRoute };
