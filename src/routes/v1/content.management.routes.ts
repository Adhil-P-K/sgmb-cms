import express, {
  Request,
  Response,
} from 'express';

const router = express.Router();
router.get('/contentmanagement', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.post('/', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.get('/', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.get('/:contentmanagementId', (req: Request, res: Response) => {
  res.send({ content: true });
});
router.put('/:contentmanagementId', (req: Request, res: Response) => {
  res.send({ content: true });
});
export { router as ContentManagementRoute };
