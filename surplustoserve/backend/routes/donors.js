import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Donor from '../models/Donor.js';

const router = express.Router();

// Register donor
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await Donor.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const donor = await Donor.create({
      name,
      email,
      password_hash,
      phone
    });

    const token = jwt.sign({ id: donor._id, type: 'donor' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Donor registered successfully',
      token,
      donor: { id: donor._id, name, email, phone }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login donor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, donor.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: donor._id, type: 'donor' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      donor: { id: donor._id, name: donor.name, email: donor.email, phone: donor.phone }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
