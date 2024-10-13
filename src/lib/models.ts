import mongoose, { Schema} from 'mongoose';
import { IFile, IUser } from './types';


const fileShema : Schema<IFile> = new mongoose.Schema({
    url: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String },
    description: { type: String }
})

const userSchema : Schema<IUser> = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    additinalInfo: { type: String },
    file: { type: [fileShema], default: []}
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);