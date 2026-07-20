'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('returns a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/OXYRA/);
  });
});

describe('GET /api/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.brand).toBe('OXYRA');
  });
});

describe('GET /api/brand', () => {
  it('returns brand metadata including whatsapp link', async () => {
    const res = await request(app).get('/api/brand');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('OXYRA');
    expect(res.body.data.whatsapp.link).toContain('wa.me');
    expect(res.body.data.instagram.handle).toBe('oxyrawater.id');
  });
});

describe('GET /api/unknown-route', () => {
  it('returns a 404 JSON error', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe(404);
  });
});
