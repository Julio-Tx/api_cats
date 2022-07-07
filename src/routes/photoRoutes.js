import { Router } from 'express';

import photoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', photoController.store);
router.delete('/', photoController.delete);

export default router;
