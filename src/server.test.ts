import { Application } from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import createServer from './server';

let server: Application;

beforeAll(() => {
  server = createServer();
});

describe('API', () => {
  describe('GET /healthcheck', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/healthcheck').send();
      expect(res.status).toBe(200);
      expect(res.text).toBe('OK');
    });
  });
});
