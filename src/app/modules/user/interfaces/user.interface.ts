export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}