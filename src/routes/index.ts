import { Router } from 'express';
import categoryRouter from '../modules/category/category.routes';

const router = Router();

router.use('/categoria', categoryRouter);

export default router;
