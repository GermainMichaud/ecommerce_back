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
  let id: string | undefined = undefined;
  let slug: string | undefined = undefined;
  describe('GET /api/products', () => {
    it('should return 200', async () => {
      const res = await request(server).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body[0]._id).toEqual(expect.any(String));
      id = res.body[0]._id;
      slug = res.body[0].slug;
    });
  });
  describe('GET /api/products/:id', () => {
    it('should return 200', async () => {
      const res = await request(server)
        .get(`/api/products/${id as string}`)
        .send();
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body._id).toEqual(id);
    });
    it('should return 404', async () => {
      const res = await request(server)
        .get('/api/products/633a70b7d51b0ea27f00ba70')
        .send();
      expect(res.status).toBe(404);
      expect(res.notFound).toBe(true);
      expect(res.body).toEqual({
        message: expect.any(String),
      });
    });
    it('should return 400 error when id is not a valid id', async () => {
      const res = await request(server).get('/api/products/notavalidid');
      expect(res.status).toBe(400);
      expect(res.body).toEqual([
        {
          code: 'custom',
          message: expect.any(String),
          path: ['params', 'id'],
        },
      ]);
    });
  });
  describe('GET /api/products/slug/:slug', () => {
    it('should return 200', async () => {
      const res = await request(server)
        .get(`/api/products/slug/${slug as string}`)
        .send();
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body._id).toEqual(id);
      expect(res.body.slug).toEqual(slug);
    });
    it('should return 404', async () => {
      const res = await request(server).get('/api/products/slug/not-a-real-slug').send();
      expect(res.status).toBe(404);
      expect(res.notFound).toBe(true);
      expect(res.body).toEqual({
        message: expect.any(String),
      });
    });
  });
});
