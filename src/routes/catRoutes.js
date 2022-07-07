import { Router } from 'express';
import catController from '../controllers/CatController';

const router = new Router();

router.get('/', catController.index);
router.post('/', catController.store);
router.put('/:id', catController.update);
router.get('/:id', catController.show);
router.delete('/:id', catController.delete);

export default router;
