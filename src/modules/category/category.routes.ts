import { Router } from 'express';

import { createSchema, paramsIDSchema, updateSchema } from './category.schema';
import { validate } from '../../middleware/validate';
import { categoryController } from './category.controller';

const router = Router();

router.post('/', validate(createSchema), categoryController.create);
router.get('/', categoryController.findAll);
router.get('/:id', validate(paramsIDSchema, 'params'), categoryController.findByID);
router.patch(
    '/:id',
    validate(paramsIDSchema, 'params'),
    validate(updateSchema),
    categoryController.upadate,
);

router.delete('/:id', validate(paramsIDSchema, 'params'), categoryController.delete);

export default router;
