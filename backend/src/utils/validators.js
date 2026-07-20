'use strict';

const ApiError = require('./ApiError');

const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Ensures a value is a non-empty, trimmed string with a max length.
 *
 * @param {unknown} value
 * @param {string} field
 * @param {{ max?: number, min?: number, required?: boolean }} [opts]
 * @returns {string}
 */
function requireString(value, field, opts = {}) {
  const { max = 500, min = 1, required = true } = opts;

  if (value === undefined || value === null || value === '') {
    if (required) throw ApiError.badRequest(`Field "${field}" wajib diisi.`);
    return '';
  }

  if (typeof value !== 'string') {
    throw ApiError.badRequest(`Field "${field}" harus berupa teks.`);
  }

  const trimmed = value.trim();

  if (trimmed.length < min) {
    throw ApiError.badRequest(`Field "${field}" minimal ${min} karakter.`);
  }
  if (trimmed.length > max) {
    throw ApiError.badRequest(`Field "${field}" maksimal ${max} karakter.`);
  }

  return trimmed;
}

/**
 * Validates an Indonesian phone number in common formats:
 * 08xx..., 628xx..., +628xx...
 *
 * @param {unknown} value
 * @param {string} field
 * @returns {string}
 */
function requirePhone(value, field = 'phone') {
  const phone = requireString(value, field, { max: 20, min: 8 });
  if (!PHONE_REGEX.test(phone)) {
    throw ApiError.badRequest(`Field "${field}" harus berupa nomor telepon Indonesia yang valid (contoh: 0811xxxxxxx).`);
  }
  return phone;
}

/**
 * Validates an email address if provided (optional field).
 *
 * @param {unknown} value
 * @param {string} field
 * @returns {string}
 */
function optionalEmail(value, field = 'email') {
  if (value === undefined || value === null || value === '') return '';
  const email = requireString(value, field, { max: 254 });
  if (!EMAIL_REGEX.test(email)) {
    throw ApiError.badRequest(`Field "${field}" harus berupa alamat email yang valid.`);
  }
  return email;
}

/**
 * Validates a positive integer quantity, defaulting to 1.
 *
 * @param {unknown} value
 * @param {string} field
 * @returns {number}
 */
function positiveIntOrDefault(value, field, fallback = 1) {
  if (value === undefined || value === null || value === '') return fallback;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0 || n > 999) {
    throw ApiError.badRequest(`Field "${field}" harus berupa angka bulat positif (1-999).`);
  }
  return n;
}

module.exports = { requireString, requirePhone, optionalEmail, positiveIntOrDefault };
