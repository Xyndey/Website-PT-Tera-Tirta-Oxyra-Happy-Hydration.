'use strict';

const { Router } = require('express');

const healthRoutes = require('./health.routes');
const brandRoutes = require('./brand.routes');
const productsRoutes = require('./products.routes');
const testimonialsRoutes = require('./testimonials.routes');
const whyRoutes = require('./why.routes');
const clubRoutes = require('./club.routes');
const labRoutes = require('./lab.routes');
const ordersRoutes = require('./orders.routes');
const contactRoutes = require('./contact.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/brand', brandRoutes);
router.use('/products', productsRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/why', whyRoutes);
router.use('/club', clubRoutes);
router.use('/lab-report', labRoutes);
router.use('/orders', ordersRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
