import { Model, Schema } from 'mongoose';
import { dbClient } from '../../index';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    address: {
      type: String,
      required: false,
      default: '',
    },

    role: {
      type: String,
      required: false,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

export default dbClient?.model<IUser>('User', userSchema) as Model<IUser>;