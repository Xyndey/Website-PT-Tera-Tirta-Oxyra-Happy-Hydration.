'use strict';

const config = require('../config');

/**
 * Builds a `wa.me` deep link with an optional pre-filled, URL-encoded message.
 * Mirrors the links baked into the original static OXYRA landing page, e.g.
 * `https://wa.me/628117710369?text=Halo%20OXYRA...`.
 *
 * @param {string} [message] Plain text message to prefill in WhatsApp.
 * @returns {string} Fully qualified wa.me URL.
 */
function buildWhatsAppLink(message) {
  const base = `https://wa.me/${config.brand.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the standard order message used across the product catalogue,
 * e.g. "Halo OXYRA, saya ingin memesan {productName} ({priceLabel})."
 *
 * @param {{ name: string, volumeLabel?: string, priceLabel: string }} product
 * @returns {string}
 */
function buildOrderMessage(product) {
  const descriptor = product.volumeLabel ? `${product.name} ${product.volumeLabel}` : product.name;
  return `Halo OXYRA, saya ingin memesan ${descriptor} (${product.priceLabel}).`;
}

module.exports = { buildWhatsAppLink, buildOrderMessage };
