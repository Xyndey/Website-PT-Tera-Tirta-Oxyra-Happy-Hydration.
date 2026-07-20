'use strict';

const db = require('../data');
const ApiError = require('../utils/ApiError');
const { buildWhatsAppLink, buildOrderMessage } = require('../utils/whatsapp');

const VALID_CATEGORIES = new Set(['all', 'refill', 'paket', 'mini', 'amdk']);

function decorate(product) {
  return {
    ...product,
    orderLink: buildWhatsAppLink(buildOrderMessage(product)),
  };
}

/**
 * GET /api/products
 * Optional query params:
 *  - category: refill | paket | mini | amdk | all (default: all)
 *  - q: free-text search across product name & description
 */
function listProducts(req, res) {
  const category = String(req.query.category || 'all').toLowerCase();
  const search = String(req.query.q || '').toLowerCase().trim();

  if (!VALID_CATEGORIES.has(category)) {
    throw ApiError.badRequest(`Kategori "${category}" tidak dikenal.`, {
      allowedCategories: Array.from(VALID_CATEGORIES),
    });
  }

  let results = db.products;

  if (category !== 'all') {
    results = results.filter((product) => product.category === category);
  }

  if (search) {
    results = results.filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(search)
    );
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results.map(decorate),
  });
}

/**
 * GET /api/products/categories
 * Returns the distinct product categories with a human-friendly label,
 * matching the filter tabs on the storefront.
 */
function listCategories(req, res) {
  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'refill', label: 'Galon Isi Ulang (19L)' },
    { id: 'paket', label: 'Paket Galon Baru' },
    { id: 'mini', label: 'Galon Mini (5L)' },
    { id: 'amdk', label: 'Kemasan Botol' },
  ];
  res.status(200).json({ success: true, data: categories });
}

/**
 * GET /api/products/:id
 */
function getProductById(req, res) {
  const product = db.products.find((item) => item.id === req.params.id);
  if (!product) {
    throw ApiError.notFound(`Produk dengan id "${req.params.id}" tidak ditemukan.`);
  }
  res.status(200).json({ success: true, data: decorate(product) });
}

module.exports = { listProducts, listCategories, getProductById };
