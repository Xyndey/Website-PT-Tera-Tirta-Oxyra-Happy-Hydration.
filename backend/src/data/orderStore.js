'use strict';

/**
 * A minimal in-memory order store. This is intentionally simple (no
 * external database) so the project runs anywhere with zero setup.
 * Swap this module for a real persistence layer (Postgres, MongoDB,
 * etc.) when moving to production — the public API (add/list/find)
 * is designed to make that swap painless.
 */
const orders = [];

function add(order) {
  orders.push(order);
  return order;
}

function list() {
  return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function findById(id) {
  return orders.find((order) => order.id === id);
}

module.exports = { add, list, findById };
