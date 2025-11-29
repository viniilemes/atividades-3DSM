import { Router } from 'express';
import OrdemServicoController from '../controllers/OrdemServicoController.js';

const router = Router();
const controller = new OrdemServicoController();

router.post('/ordens', controller.create.bind(controller));
router.get('/ordens', controller.getAll.bind(controller));
router.put('/ordens/:id', controller.update.bind(controller));
router.delete('/ordens/:id', controller.delete.bind(controller));

export default router;
