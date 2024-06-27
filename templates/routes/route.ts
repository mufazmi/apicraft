import express, { Request } from 'express';
import baseController from '../controllers/base-kebab-controller'
const am = require('../middlewares/async-middleware');

const router = express.Router();


router.post('/',am(baseController.create))
router.get('/',am(baseController.findAll))
router.get('/:id',am(baseController.findOne))
router.patch('/:id',am(baseController.update))

export default router;