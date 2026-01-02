import express from 'express';
import {chatHandler} from '../controller/chatController.js';

const router = express.Router();

router.post('/ask', chatHandler);

export default router;