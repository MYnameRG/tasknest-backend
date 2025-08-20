import { Request, Response } from 'express';
import MTask from '../models/task.model';
import { getCategorizedTasks } from '../services/task.service';
import mongoose from 'mongoose';

class TaskController {

    /**
     * @route GET /api/v1/task/list
     */
    static listTasks = async (_: Request, res: Response) => {
        try {
            const tasks = await MTask?.find();

            return res.status(200).json({ success: true, tasks });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error fetching tasks!', error });
        }
    };

    /**
     * @route POST /api/v1/task/add
     */
    static addTask = async (req: Request, res: Response) => {
        try {
            const {
                title,
                content: description,
                category,
                deadline,
                priority
            } = req.body;

            if (!title) {
                return res.status(400).json({ success: false, message: 'Title is required!' });
            }

            const newTask = await MTask?.create({
                title,
                description,
                category,
                deadline,
                priority
            });

            return res.status(201).json({ success: true, message: 'Task created successfully!', created: newTask.toObject() });
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

            const {
                title,
                content: description,
                category,
                deadline,
                priority
            } = req.body;

            const updatedTask = await MTask?.findByIdAndUpdate(
                id,
                {
                    ...(title && { title }),
                    ...((description || description == '') && { description }),
                    ...((category || category == '') && { category }),
                    ...((deadline || deadline == null) && { deadline }),
                    ...(priority >= -1 && { priority })
                },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ success: false, message: 'Task not found!' });
            }

            return res.status(200).json({ success: true, message: 'Task updated successfully!', updated: updatedTask.toObject() });
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

            const deletedTask = await MTask?.findByIdAndDelete(id);
            if (!deletedTask) {
                return res.status(404).json({ success: false, message: 'Task not found!' });
            }

            return res.status(200).json({ success: true, message: `Task deleted successfully!`, deleted: deletedTask.toObject() });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error deleting task!', error });
        }
    };

    /**
     * @route GET /api/v1/task/auto-categorize
     */
    static autoCategorizedTasks = async (_: Request, res: Response) => {
        try {
            const countTasks = await MTask?.countDocuments();

            if (!countTasks) {
                return res.status(400).json({ success: false, message: 'Task is not available!' })
            }

            const nonCategorizedTasks = await MTask?.find({
                $or: [
                    { category: { $exists: false } },
                    { category: "" },
                    { category: null }
                ]
            });

            if (!nonCategorizedTasks || nonCategorizedTasks.length === 0) {
                return res.status(400).json({ success: false, message: 'Task already categorized!' })
            }

            const categorizedTasks = await getCategorizedTasks(nonCategorizedTasks);
            const bulkOps = categorizedTasks.map((task: any) => ({
                updateOne: {
                    filter: { _id: new mongoose.Types.ObjectId(task.task_id) },
                    update: { $set: { category: task.category, updatedAt: new Date() } }
                }
            }));

            if (!bulkOps || bulkOps.length == 0) {
                return res.status(400).json({ success: false, message: 'Task not categorized!' })
            }

            await MTask?.bulkWrite(bulkOps);

            const savedTasks = await MTask?.find();

            return res.status(200).json({ success: true, tasks: savedTasks, message: `Saved categorized successfully!` });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Error auto categorize tasks!', error });
        }
    };
}

export const {
    listTasks,
    addTask,
    deleteTask,
    updateTask,
    autoCategorizedTasks
} = TaskController;