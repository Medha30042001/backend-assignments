import express from 'express';
import { createUser, 
    deleteUser, 
    getUser, 
    getUserById, 
    updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/add-user', createUser);
router.get('/', getUser);
router.get('/:userId', getUserById);
router.put('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);

export default router;