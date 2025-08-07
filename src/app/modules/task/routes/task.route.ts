import { Router } from 'express';
import { listTasks, addTask, updateTask, deleteTask } from '../controllers/task.controller';

const taskRouter = Router();

// Get all tasks
taskRouter.get('/list', listTasks);

// Create the task
taskRouter.post('/add', addTask);

// Edit the task
taskRouter.put('/update/:id', updateTask);

// Delete the task
taskRouter.delete('/remove/:id', deleteTask);

export default taskRouter;