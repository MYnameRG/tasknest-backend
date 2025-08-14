import { Schema, Model } from 'mongoose';
import { dbClient } from '../../index';
import { ITask } from '../interfaces/task.interface';
import { Tags, Priority, Status } from "../../../shared/enums/task.enum";

const taskSchema = new Schema<ITask>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User' 
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    isArchieve: {
      type: Boolean,
      default: false
    },
    deadline: {
      type: Date
    },
    category: {
      type: String,
      enum: [Tags.GENERAL, Tags.MEETING, Tags.PERSONAL, Tags.WORK, Tags.STUDY],
      default: Tags.GENERAL
    },
    priority: {
      type: Number,
      enum: [Priority.LOW, Priority.MEDIUM, Priority.HIGH],
      default: Priority.LOW
    },
    status: {
      type: String,
      enum: [Status.TODO, Status.INPROGRESS, Status.COMPLETED],
      default: Status.TODO
    }
  },
  {
    timestamps: true
  }
);

export default dbClient?.model<ITask>('Task', taskSchema) as Model<ITask>;