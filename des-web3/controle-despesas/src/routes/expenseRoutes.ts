import { Router } from 'express';
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getTotalExpenses
} from '../controllers/expenseController';

const router = Router();

// Rotas CRUD
router.post('/', createExpense); // Criar [cite: 40]
router.get('/', getAllExpenses); // Ler [cite: 41]
router.put('/:id', updateExpense); // Atualizar [cite: 41]
router.delete('/:id', deleteExpense); // Excluir [cite: 42]

// Nova rota para obter o somatório das despesas [cite: 106]
router.get('/total', getTotalExpenses); // [cite: 107]

export default router;