import { Router } from 'express';
import { listTasks, addTask, updateTask, deleteTask } from '../controllers/task.controller';
import { RequestValidator } from '../../../validators/request-validator';
import { ManageTaskBodySchema } from '../dtos/body/manage-task.dto';
import { GetTaskParamsSchema } from '../dtos/params/get-task.dto';

const taskRouter = Router();

// Get all tasks
taskRouter.get('/list', listTasks);

// Create the task
taskRouter.post('/add', RequestValidator({ bodySchema: ManageTaskBodySchema }), addTask);

// Edit the task
taskRouter.put(['/update', '/update/:id'], RequestValidator({ bodySchema: ManageTaskBodySchema, paramSchema: GetTaskParamsSchema }), updateTask);

// Delete the task
taskRouter.delete(['/remove', '/remove/:id'], RequestValidator({ paramSchema: GetTaskParamsSchema }), deleteTask);

export default taskRouter;