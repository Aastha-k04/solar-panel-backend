import express from 'express';
import authRoutes from './auth.routes.js';
import solarPanelRoutes from './solarPanel.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';

const router = express.Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || 'v1';

// Mount routes
router.use(`/api/${API_VERSION}/auth`, authRoutes);
router.use(`/api/${API_VERSION}/panels`, solarPanelRoutes);
router.use(`/api/${API_VERSION}/cart`, cartRoutes);
router.use(`/api/${API_VERSION}/orders`, orderRoutes);

export default router;