'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/testimonials', () => {
  it('returns 3 testimonials', async () => {
    const res = await request(app).get('/api/testimonials');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
    expect(res.body.data[0].author).toBe('Keluarga Hendra');
  });
});

describe('GET /api/why', () => {
  it('returns 4 value propositions', async () => {
    const res = await request(app).get('/api/why');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(4);
  });
});

describe('GET /api/club', () => {
  it('returns club activities and benefits', async () => {
    const res = await request(app).get('/api/club');
    expect(res.status).toBe(200);
    expect(res.body.data.activities).toHaveLength(5);
    expect(res.body.data.benefits).toHaveLength(4);
  });
});

describe('GET /api/lab-report', () => {
  it('returns the illustrative lab report', async () => {
    const res = await request(app).get('/api/lab-report');
    expect(res.status).toBe(200);
    expect(res.body.data.isIllustrative).toBe(true);
    expect(res.body.data.metrics.length).toBeGreaterThan(0);
  });
});

describe('POST /api/contact', () => {
  it('accepts a partnership inquiry and returns a whatsapp link', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Andi',
        phone: '081177109999',
        topic: 'kemitraan',
        message: 'Saya ingin menjadi mitra distribusi OXYRA di area Sekupang.',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.whatsappLink).toContain('wa.me');
  });

  it('rejects a message that is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Andi', phone: '081177109999', message: 'hi' });
    expect(res.status).toBe(400);
  });
});
