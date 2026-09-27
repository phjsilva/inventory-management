import { Router } from 'express';
import categoryRouter from '../modules/category/category.routes';
import productRouter from '../modules/product/product.routes';

const router = Router();

router.use('/categoria', categoryRouter);
router.use('/produto', productRouter);

export default router;
