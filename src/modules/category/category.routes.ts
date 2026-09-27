import { Router } from 'express';
import { createCategorySchema, paramsIdSchema, updateCategorySchema } from './category.schema';
import { validate } from '../../middleware/validate';
import { categoryController } from './category.controller';

const router = Router();

router.post('/', validate(createCategorySchema), categoryController.create);
router.get('/', categoryController.list);
router.get('/:id', validate(paramsIdSchema, 'params'), categoryController.getById);
router.patch(
    '/:id',
    validate(paramsIdSchema, 'params'),
    validate(updateCategorySchema),
    categoryController.update,
);
router.delete('/:id', validate(paramsIdSchema, 'params'), categoryController.delete);

export default router;
