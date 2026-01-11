import express from 'express';
import authRoutes from './auth.routes.js';

const router = express.Router();

// API version prefix
const API_VERSION = process.env.API_VERSION || 'v1';

// Mount routes
router.use(`/api/${API_VERSION}/auth`, authRoutes);

export default router;