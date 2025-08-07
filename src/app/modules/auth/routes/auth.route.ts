import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';

const authRouter = Router();

// Register the user
authRouter.post('/register', registerUser);

// Login the user
authRouter.post('/login', loginUser);

export default authRouter;