/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { createSeller } from '../controllers/seller.controller';

const router = Router();

// router.get('/', getSellers);
router.post('/', createSeller);

router.use('/sellers', router);

export default router;
