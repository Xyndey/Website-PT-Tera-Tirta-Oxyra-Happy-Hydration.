'use strict';

const { v4: uuidv4 } = require('uuid');

const contactStore = require('../data/contactStore');
const { buildWhatsAppLink } = require('../utils/whatsapp');
const { requireString, requirePhone, optionalEmail } = require('../utils/validators');

const TOPICS = new Set(['kemitraan', 'grosir', 'umum', 'komunitas']);

/**
 * POST /api/contact
 * Body: { name, phone, email?, topic?, message }
 *
 * Handles the "Kemitraan & grosir" and general contact inquiries. Stores
 * the message in-memory and returns a WhatsApp deep link pre-filled with
 * the inquiry, mirroring the original static page's mailto/wa.me CTA.
 */
function submitContact(req, res) {
  const body = req.body || {};

  const name = requireString(body.name, 'name', { max: 120, min: 2 });
  const phone = requirePhone(body.phone, 'phone');
  const email = optionalEmail(body.email, 'email');
  const message = requireString(body.message, 'message', { max: 1000, min: 5 });

  let topic = String(body.topic || 'umum').toLowerCase();
  if (!TOPICS.has(topic)) topic = 'umum';

  const entry = {
    id: uuidv4(),
    name,
    phone,
    email: email || undefined,
    topic,
    message,
    createdAt: new Date().toISOString(),
  };

  contactStore.add(entry);

  const waMessage = [
    `Halo OXYRA, saya ${name} (${topic}).`,
    message,
    email ? `Email: ${email}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  res.status(201).json({
    success: true,
    message: 'Pesan kamu berhasil terkirim. Tim OXYRA akan segera menghubungi kamu.',
    data: {
      entry,
      whatsappLink: buildWhatsAppLink(waMessage),
    },
  });
}

/**
 * GET /api/contact
 * Lists submitted inquiries (would be admin-protected in production).
 */
function listContacts(req, res) {
  const entries = contactStore.list();
  res.status(200).json({ success: true, count: entries.length, data: entries });
}

module.exports = { submitContact, listContacts };
