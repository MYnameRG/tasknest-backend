import User from '../../user/models/user.model';

export interface ITask extends Document {
    user: typeof User;
    title: string;
    description?: string;
    category: '' | 'GENERAL' | 'PERSONAL' | 'MEETING' | 'STUDY' | 'WORK';
    priority: -1 | 0 | 1 | 2;
    deadline?: Date;
    isArchieve: boolean;
    status: 'TODO' | 'INPROGRESS' | 'COMPLETED';
    createdAt: Date;
    updatedAt: Date;
}