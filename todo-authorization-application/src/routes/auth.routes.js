import express from 'express';
import { deleteUser, 
        signupUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login')
router.delete('/delete-user/:userId', deleteUser);

export default router;