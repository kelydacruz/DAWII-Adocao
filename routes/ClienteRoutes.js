import express from 'express';
const router = express.Router();
import ClienteController from '../controllers/ClienteController.js';

const controle = new ClienteController();

// Quando acessar /cliente, chama o index do controlador
router.get('/', controle.index);

export default router;