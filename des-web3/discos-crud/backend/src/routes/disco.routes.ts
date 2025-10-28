import { Router } from 'express';
import {
  createDisco,
  getAllDiscos,
  getDiscoById,
  updateDisco,
  deleteDisco
} from '../controllers/disco.controller.js';

const router = Router();

// Endpoint para criar um novo disco
router.post('/discos', createDisco);

// Endpoint para listar todos os discos
router.get('/discos', getAllDiscos);

// Endpoint para buscar um disco (necessário para edição)
router.get('/discos/:id', getDiscoById);

// Endpoint para atualizar um disco
router.put('/discos/:id', updateDisco);

// Endpoint para excluir um disco
router.delete('/discos/:id', deleteDisco);

export default router;