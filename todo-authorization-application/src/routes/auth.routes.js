import express from 'express';
import { deleteUser, 
        loginUser, 
        signupUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser)
router.delete('/delete-user/:userId', deleteUser);

export default router;