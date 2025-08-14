import User from '../../user/models/user.model';

export interface ITask extends Document {
    user: typeof User;
    title: string;
    description?: string;
    category: 'General' | 'Personal' | 'Meeting' | 'Study' | 'Work';
    priority: 0 | 1 | 2;
    deadline?: Date;
    isArchieve: boolean;
    status: 'To Do' | 'In Progress' | 'Completed';
    createdAt: Date;
    updatedAt: Date;
}