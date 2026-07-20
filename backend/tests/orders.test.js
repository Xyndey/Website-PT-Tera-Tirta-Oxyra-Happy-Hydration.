'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('POST /api/orders', () => {
  it('creates an order and returns a whatsapp link', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Budi Santoso',
        phone: '081177101234',
        address: 'Jl. Sudirman No. 10, Batam Centre',
        items: [
          { productId: 'refill-hexagonal-oxygen-19l', quantity: 2 },
          { productId: 'mini-alkaline-5l' },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.order.estimatedTotal).toBe(15000 * 2 + 35000);
    expect(res.body.data.whatsappLink).toContain('wa.me');
  });

  it('rejects a missing customerName', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        phone: '081177101234',
        address: 'Jl. Sudirman No. 10',
        items: [{ productId: 'mini-alkaline-5l' }],
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects an invalid phone number', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Budi',
        phone: '12345',
        address: 'Jl. Sudirman No. 10',
        items: [{ productId: 'mini-alkaline-5l' }],
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects an unknown product id', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Budi',
        phone: '081177101234',
        address: 'Jl. Sudirman No. 10',
        items: [{ productId: 'tidak-ada' }],
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects an empty items array', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Budi',
        phone: '081177101234',
        address: 'Jl. Sudirman No. 10',
        items: [],
      });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/orders', () => {
  it('lists previously created orders', async () => {
    await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Siti',
        phone: '081177105678',
        address: 'Jl. Diponegoro No. 5',
        items: [{ productId: 'amdk-alkaline-500ml' }],
      });

    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });
});
