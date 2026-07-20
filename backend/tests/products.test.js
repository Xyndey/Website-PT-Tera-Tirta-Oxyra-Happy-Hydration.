'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/products', () => {
  it('returns all 11 products by default', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(11);
    expect(res.body.data[0]).toHaveProperty('orderLink');
    expect(res.body.data[0].orderLink).toContain('wa.me');
  });

  it('filters by category=refill', async () => {
    const res = await request(app).get('/api/products?category=refill');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(4);
    res.body.data.forEach((product) => {
      expect(product.category).toBe('refill');
    });
  });

  it('filters by free-text search', async () => {
    const res = await request(app).get('/api/products?q=terahertz');
    expect(res.status).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(2);
  });

  it('rejects an unknown category', async () => {
    const res = await request(app).get('/api/products?category=nope');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/products/categories', () => {
  it('returns the 5 filter tabs', async () => {
    const res = await request(app).get('/api/products/categories');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.data[0]).toEqual({ id: 'all', label: 'Semua Produk' });
  });
});

describe('GET /api/products/:id', () => {
  it('returns a single product', async () => {
    const res = await request(app).get('/api/products/refill-hexagonal-oxygen-19l');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Hexagonal Oxygen');
    expect(res.body.data.priceLabel).toBe('Rp 15.000');
  });

  it('returns 404 for an unknown product id', async () => {
    const res = await request(app).get('/api/products/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
