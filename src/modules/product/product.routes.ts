import { Router } from 'express';

import { validate } from '../../middleware/validate';
import { createProductSchema } from './product.schema';
import { productController } from './product.controller';

const router = Router();

router.post('/', validate(createProductSchema), productController.create);

export default router;
