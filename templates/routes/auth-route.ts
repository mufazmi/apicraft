import express, { Request } from 'express';
import authController from '../controllers/auth-controller'
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/login',am(authController.login))
router.post('/register',am(authController.register))
router.all('/refresh',am(authController.refresh))
router.post('/forgot',am(authController.forgot))
router.post('/reset',am(authController.reset))
router.post('/verify',am(authController.verify))
router.post('/google',am(authController.google))

export default router;