import express from 'express'
import { createTodo, 
        deleteTodo, 
        getUserTodo, 
        updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/add-todo', createTodo);
router.get('/get-my-todo/:userId', getUserTodo);
router.put('/update-todo/:todoId', updateTodo);
router.delete('/delete-todo/:todoId', deleteTodo)

export default router;