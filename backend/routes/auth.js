import { Router } from 'express';
import pkg from 'jsonwebtoken';
import Provider from '../models/Provider.js';

const router = Router();
const { sign } = pkg;

// Add this temporarily in backend/routes/auth.js at the top
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);

//JWT secret explicit
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET is not defined');

const token = sign(
  { userId: Provider._id, email: Provider.email },
  secret,
  { expiresIn: '7d' }
);

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Provider.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const user = await Provider.create({ name, email, password });

    const token = sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login body received:', req.body);
    const { email, password } = req.body;

    const user = await Provider.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;