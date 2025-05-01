import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodo
} from '../controllers/todoController.js';

const router = express.Router();

// Protect all todo routes with authentication
router.use(auth);

router.get('/', getAllTodos);
router.post('/', createTodo);
router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;