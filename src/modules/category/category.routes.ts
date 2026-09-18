import { Router } from 'express';

import { createCategorySchema } from './category.schema';
import { validate } from '../../middleware/validate';
import { categoryController } from './category.controller';

const router = Router();

router.post('/', validate(createCategorySchema), categoryController.create);

export default router;
