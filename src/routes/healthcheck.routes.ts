import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *   tags:
 *   - Healthcheck
 *   description: Healthcheck endpoint
 *   responses:
 *    200:
 *     description: Application is healthy
 */
router.get('/healthcheck', (_req, res) => res.sendStatus(200));

export default router;
