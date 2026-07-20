'use strict';

const config = require('../config');
const { buildWhatsAppLink } = require('../utils/whatsapp');

/**
 * GET /api/brand
 * Returns brand-level metadata (name, tagline, contact channels) so the
 * frontend never has to hard-code the WhatsApp number or Instagram
 * handle in more than one place.
 */
function getBrand(req, res) {
  res.status(200).json({
    success: true,
    data: {
      name: config.brand.name,
      tagline: config.brand.tagline,
      serviceArea: config.brand.serviceArea,
      instagram: {
        handle: config.brand.instagramHandle,
        url: `https://instagram.com/${config.brand.instagramHandle}`,
      },
      whatsapp: {
        number: config.brand.whatsappNumber,
        displayNumber: '0811-7710-369',
        link: buildWhatsAppLink(),
        partnershipLink: buildWhatsAppLink(
          'Halo OXYRA, saya tertarik untuk kemitraan / pembelian grosir.'
        ),
      },
      logoUrl: 'https://i.imgur.com/QiQ40UB.jpeg',
      splashImageUrl: 'https://i.imgur.com/SKOAvML.png',
      copyrightYear: new Date().getFullYear(),
    },
  });
}

module.exports = { getBrand };
