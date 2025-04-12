import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface to type the document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email uniqueness
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the User model based on the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
