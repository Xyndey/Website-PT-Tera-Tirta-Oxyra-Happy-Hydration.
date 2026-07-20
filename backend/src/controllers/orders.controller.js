'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require('../data');
const orderStore = require('../data/orderStore');
const ApiError = require('../utils/ApiError');
const { buildWhatsAppLink } = require('../utils/whatsapp');
const { requireString, requirePhone, positiveIntOrDefault } = require('../utils/validators');

/**
 * Builds the human-readable WhatsApp order message summarizing every
 * line item, matching the tone of the original per-product wa.me links.
 *
 * @param {{ customerName: string, items: Array<{ product: object, quantity: number }>, address: string, notes?: string }} order
 */
function buildSummaryMessage(order) {
  const lines = order.items.map(
    (item, index) => `${index + 1}. ${item.product.name} (${item.product.priceLabel}) x${item.quantity}`
  );

  const parts = [
    `Halo OXYRA, saya ${order.customerName} ingin memesan:`,
    ...lines,
    `Alamat pengantaran: ${order.address}`,
  ];

  if (order.notes) parts.push(`Catatan: ${order.notes}`);
  parts.push(`Total perkiraan: Rp ${order.estimatedTotal.toLocaleString('id-ID')}`);

  return parts.join('\n');
}

/**
 * POST /api/orders
 * Body: {
 *   customerName: string,
 *   phone: string,
 *   address: string,
 *   notes?: string,
 *   items: Array<{ productId: string, quantity?: number }>
 * }
 *
 * Validates the payload, resolves product line items, computes an
 * estimated total, stores the order in-memory, and returns a ready-to-
 * use WhatsApp deep link so the order can be confirmed by the OXYRA team.
 */
function createOrder(req, res) {
  const body = req.body || {};

  const customerName = requireString(body.customerName, 'customerName', { max: 120, min: 2 });
  const phone = requirePhone(body.phone, 'phone');
  const address = requireString(body.address, 'address', { max: 300, min: 5 });
  const notes = requireString(body.notes, 'notes', { max: 300, required: false });

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw ApiError.badRequest('Field "items" wajib berupa array berisi minimal satu produk.');
  }
  if (body.items.length > 20) {
    throw ApiError.badRequest('Maksimal 20 jenis produk per pesanan.');
  }

  const items = body.items.map((rawItem, index) => {
    const productId = requireString(rawItem && rawItem.productId, `items[${index}].productId`, { max: 100 });
    const quantity = positiveIntOrDefault(rawItem && rawItem.quantity, `items[${index}].quantity`, 1);

    const product = db.products.find((p) => p.id === productId);
    if (!product) {
      throw ApiError.badRequest(`Produk pada items[${index}] tidak ditemukan (id: ${productId}).`);
    }

    return { product, quantity };
  });

  const estimatedTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = {
    id: uuidv4(),
    customerName,
    phone,
    address,
    notes: notes || undefined,
    items: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
      subtotal: item.product.price * item.quantity,
    })),
    estimatedTotal,
    status: 'pending_whatsapp_confirmation',
    createdAt: new Date().toISOString(),
  };

  orderStore.add(order);

  const whatsappMessage = buildSummaryMessage({ customerName, items, address, notes, estimatedTotal });

  res.status(201).json({
    success: true,
    message: 'Pesanan berhasil dibuat. Lanjutkan konfirmasi melalui WhatsApp untuk memproses pengantaran.',
    data: {
      order,
      whatsappLink: buildWhatsAppLink(whatsappMessage),
    },
  });
}

/**
 * GET /api/orders
 * Returns all orders placed so far (most recent first). In a real
 * deployment this would be protected behind admin authentication.
 */
function listOrders(req, res) {
  const orders = orderStore.list();
  res.status(200).json({ success: true, count: orders.length, data: orders });
}

/**
 * GET /api/orders/:id
 */
function getOrderById(req, res) {
  const order = orderStore.findById(req.params.id);
  if (!order) {
    throw ApiError.notFound(`Pesanan dengan id "${req.params.id}" tidak ditemukan.`);
  }
  res.status(200).json({ success: true, data: order });
}

module.exports = { createOrder, listOrders, getOrderById };
