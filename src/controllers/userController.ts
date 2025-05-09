import { Request, Response} from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
export const registerUser = async (req: Request, res: Response): Promise<void> =>{
  const {name, email, password} = req.body;

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      res.status(400).json({message: 'User already exists'});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET as string, { expiresIn: '1h'});

    res.status(201).json({token});
  } catch (error) {
    res.status(500).json({message: 'Server error' });
  }
};

// User login
export const loginUser = async (req: Request, res: Response):Promise<void> =>{
  const {email, password} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId); 
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user profile
export const deleteUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};