import { Schema, Document, Model } from 'mongoose';
import { dbClient } from '../../index';
import { ITask } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true
  }
);

export default dbClient?.model<ITask>('Task', taskSchema) as Model<ITask>;