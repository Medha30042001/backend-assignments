import express from 'express';

const router = express.Router();

router.post('/', addTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;