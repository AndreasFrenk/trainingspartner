import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
