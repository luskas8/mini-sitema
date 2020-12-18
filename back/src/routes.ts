import express from 'express';
import path from 'path';

import userController from './controllers/userController';

// Constante de roteamento da aplicação
const router = express.Router();

/* Rotas de usuário */
router.get('/user/:id', userController.index);

router.put('/user', userController.alter);

router.post('/user', userController.create);

router.delete('/user/:id', userController.delete);

router.post('/user/session', userController.create_session);

export default router;