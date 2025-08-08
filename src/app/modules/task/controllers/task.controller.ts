import { Request, Response } from 'express';
import MTask from '../models/task.model';

class TaskController {

    /**
     * @route GET /api/v1/task/list
     */
    static listTasks = async (_: Request, res: Response) => {
        try {
            const tasks = await MTask?.find();

            return res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error fetching tasks!', error });
        }
    };

    /**
     * @route POST /api/v1/task/add
     */
    static addTask = async (req: Request, res: Response) => {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Title is required!' });
            }

            const newTask = await MTask?.create({ title, description });

            return res.status(201).json({ success: true, message: 'Task created successfully!', data: newTask });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Error creating task!', error });
        }
    };

    /**
     * @route PUT /api/v1/task/update/:id
     */
    static updateTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            // if (!id || typeof id !== 'string') {
            //     return res.status(400).json({ success: false, message: 'Task id is required as query param!' });
            // }

            const { title, description } = req.body;

            const updatedTask = await MTask?.findByIdAndUpdate(
                id,
                {
                    ...(title && { title }),
                    ...(description && { description }) 
                },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ success: false, message: 'Task not found!' });
            }

            return res.status(200).json({ success: true, message: 'Task updated successfully!', data: updatedTask });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error updating task!', error });
        }
    };

    /**
     * @route DELETE /api/v1/task/delete/:id
     */
    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            // if (!id || typeof id !== 'string') {
            //     return res.status(400).json({ success: false, message: 'Task id is required as query param!' });
            // }

            const deletedTask = await MTask?.findByIdAndDelete(id);

            if (!deletedTask) {
                return res.status(404).json({ success: false, message: 'Task not found!' });
            }

            return res.status(200).json({ success: true, message: `Task deleted successfully!`, data: deletedTask });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error deleting task!', error });
        }
    };
}

export const {
    listTasks,
    addTask,
    deleteTask,
    updateTask
} = TaskController;