import express from 'express'
import { createUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/add-user', createUser);
router.delete('/delete-user/:userId', deleteUser);

export default router;