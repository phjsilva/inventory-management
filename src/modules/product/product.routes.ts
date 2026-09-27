import { Router } from 'express';

import { validate } from '../../middleware/validate';
import { createSchema } from './product.schema';
import { productController } from './product.controller';

const router = Router();

router.post('/', validate(createSchema), productController.create);

export default router;
