import express from 'express'
import { getMyProfile, 
        registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', registerUser);
router.get('/myprofile', getMyProfile);

export default router;