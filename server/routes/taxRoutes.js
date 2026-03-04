import express from 'express';
import { handleTaxChat } from '../controllers/taxController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chat', protect, handleTaxChat);

export default router;
