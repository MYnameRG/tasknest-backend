import { Router } from 'express';
import authRoutes from '../modules/auth/routes/auth.route';
import taskRoutes from '../modules/task/routes/task.route';
import { tokenValidator } from '../validators/token-validator';

const v1 = Router();

// Authentication Route
v1.use('/auth', authRoutes);

// Managing Task Route
v1.use('/task', tokenValidator, taskRoutes);

export default v1;