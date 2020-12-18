import express from 'express';
import path from 'path';

import userController from './controllers/userController';

// Constante de roteamento dos módulos da aplicação
const router = express.Router();

// Rotas de usuário
router.get('/user/:id', userController.index);
router.post('/user', userController.create);
router.delete('/user/:id', userController.delete);
router.post('/user/session', userController.create_session);

export default router;