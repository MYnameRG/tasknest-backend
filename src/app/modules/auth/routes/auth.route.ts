import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { RequestValidator } from '../../../validators/request-validator';
import { AddUserBodySchema } from '../dtos/body/add-user.dto';
import { GetUserBodySchema } from '../dtos/body/get-user.dto';

const authRouter = Router();

// Register the user
authRouter.post('/register', RequestValidator({ bodySchema: AddUserBodySchema }), registerUser);

// Login the user
authRouter.post('/login', RequestValidator({ bodySchema: GetUserBodySchema }), loginUser);

export default authRouter;