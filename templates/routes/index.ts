import express, { Request } from 'express';
import auth from '../middlewares/auth-middleware';

// Import routes
import authRoute from './auth-route';
const router = express.Router();

// AUTH
router.use('/auth', authRoute);

export default router;