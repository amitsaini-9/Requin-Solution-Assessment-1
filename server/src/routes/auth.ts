import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../models/AuthUser'; // Updated import path

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await AuthUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthUser({ username, password: hashedPassword, role });

    await user.save();
    console.log('User registered successfully:', username);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AuthUser.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;