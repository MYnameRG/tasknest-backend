export interface ITask extends Document {
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}