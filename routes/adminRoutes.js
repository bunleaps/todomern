import express from 'express';
import { auth } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import {
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser,
    getUserTodos
} from '../controllers/adminController.js';

const router = express.Router();

// All routes are protected by auth and adminAuth middleware
router.use(auth);
router.use(adminAuth);

router.get('/users', getAllUsers);
router.get('/users/:username', getUserByUsername);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:username/todos', getUserTodos);

export default router;