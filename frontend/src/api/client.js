import {
  FALLBACK_BRAND,
  FALLBACK_PRODUCTS,
  FALLBACK_CATEGORIES,
  FALLBACK_WHY,
  FALLBACK_CLUB,
  FALLBACK_TESTIMONIALS,
  FALLBACK_LAB_REPORT,
} from './fallbackData.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const REQUEST_TIMEOUT_MS = 6000;

/**
 * Performs a `fetch` with a timeout, throwing on non-2xx responses so
 * callers can uniformly `.catch()` and fall back to local fixtures.
 *
 * @param {string} path Path relative to API_URL, e.g. "/products".
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      const message = body?.error?.message || `Request ke ${path} gagal (${res.status})`;
      throw new Error(message);
    }

    return body;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Wraps a live API call with a fallback to static local fixtures, so the
 * storefront always renders correctly even if the backend is offline —
 * useful for demos, static hosting, or first-time local setup.
 *
 * @template T
 * @param {() => Promise<T>} liveCall
 * @param {T} fallback
 * @returns {Promise<T>}
 */
async function withFallback(liveCall, fallback) {
  try {
    return await liveCall();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[OXYRA API] Menggunakan data cadangan lokal:', err.message);
    return fallback;
  }
}

export const api = {
  getBrand: () => withFallback(async () => (await request('/brand')).data, FALLBACK_BRAND),

  getProducts: (params = {}) =>
    withFallback(async () => {
      const query = new URLSearchParams(params).toString();
      const res = await request(`/products${query ? `?${query}` : ''}`);
      return res.data;
    }, FALLBACK_PRODUCTS),

  getCategories: () =>
    withFallback(async () => (await request('/products/categories')).data, FALLBACK_CATEGORIES),

  getWhyOxyra: () => withFallback(async () => (await request('/why')).data, FALLBACK_WHY),

  getClub: () => withFallback(async () => (await request('/club')).data, FALLBACK_CLUB),

  getTestimonials: () =>
    withFallback(async () => (await request('/testimonials')).data, FALLBACK_TESTIMONIALS),

  getLabReport: () => withFallback(async () => (await request('/lab-report')).data, FALLBACK_LAB_REPORT),

  createOrder: (payload) =>
    request('/orders', { method: 'POST', body: JSON.stringify(payload) }),

  submitContact: (payload) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
};

export default api;
