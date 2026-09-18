import { Router } from 'express';

import { createCategorySchema, findIDSchema } from './category.schema';
import { validate } from '../../middleware/validate';
import { categoryController } from './category.controller';

const router = Router();

router.post('/', validate(createCategorySchema), categoryController.create);
router.get('/', categoryController.findAll);
router.get('/:id', validate(findIDSchema, 'params'), categoryController.findByID);

export default router;
