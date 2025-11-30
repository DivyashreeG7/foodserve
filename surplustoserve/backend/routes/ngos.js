import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import NGO from '../models/NGO.js';

const router = express.Router();

// Register NGO
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, secret_key } = req.body;

    if (!name || !email || !password || !phone || !address || !secret_key) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await NGO.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const ngo = await NGO.create({
      name,
      email,
      password_hash,
      phone,
      address,
      secret_key
    });

    const token = jwt.sign({ id: ngo._id, type: 'ngo' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'NGO registered successfully',
      token,
      ngo: { id: ngo._id, name, email, phone, address }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login NGO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, ngo.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: ngo._id, type: 'ngo' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      ngo: { id: ngo._id, name: ngo.name, email: ngo.email, phone: ngo.phone, address: ngo.address }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Validate secret key
router.post('/validate-secret', async (req, res) => {
  try {
    const { ngoId, secretKey } = req.body;

    if (!ngoId || !secretKey) {
      return res.status(400).json({ error: 'NGO ID and secret key are required' });
    }

    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    if (ngo.secret_key !== secretKey) {
      return res.status(401).json({ error: 'Invalid secret key' });
    }

    res.json({ message: 'Secret key validated successfully', valid: true });
  } catch (error) {
    console.error('Validate secret error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
