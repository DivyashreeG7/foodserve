import express from 'express';
import Food from '../models/Food.js';
import Donor from '../models/Donor.js';
import FoodHistory from '../models/FoodHistory.js';
import { authenticateDonor, authenticateNGO } from '../middleware/auth.js';

const router = express.Router();

// Add food (donor only)
router.post('/', authenticateDonor, async (req, res) => {
  try {
    const { food_name, quantity, distance_text, phone, notes, latitude, longitude } = req.body;

    if (!food_name || !quantity || !phone) {
      return res.status(400).json({ error: 'Food name, quantity, and phone are required' });
    }

    const food = await Food.create({
      donor_id: req.userId,
      food_name,
      quantity,
      distance_text,
      phone,
      notes,
      latitude,
      longitude
    });

    res.status(201).json({
      message: 'Food added successfully',
      food: { id: food._id, food_name, quantity, status: 'available' }
    });
  } catch (error) {
    console.error('Add food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get available foods (NGO)
router.get('/available', async (req, res) => {
  try {
    const foods = await Food.find({ status: 'available' })
      .populate('donor_id', 'name phone')
      .sort({ createdAt: -1 });

    const formattedFoods = foods.map(food => ({
      id: food._id,
      food_name: food.food_name,
      quantity: food.quantity,
      distance_text: food.distance_text,
      phone: food.phone,
      notes: food.notes,
      latitude: food.latitude,
      longitude: food.longitude,
      status: food.status,
      created_at: food.createdAt,
      donor_name: food.donor_id.name,
      donor_phone: food.donor_id.phone
    }));

    res.json({ foods: formattedFoods });
  } catch (error) {
    console.error('Get available foods error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get donor's own foods
router.get('/my', authenticateDonor, async (req, res) => {
  try {
    const foods = await Food.find({ donor_id: req.userId }).sort({ createdAt: -1 });

    const formattedFoods = foods.map(food => ({
      id: food._id,
      food_name: food.food_name,
      quantity: food.quantity,
      status: food.status,
      created_at: food.createdAt
    }));

    res.json({ foods: formattedFoods });
  } catch (error) {
    console.error('Get my foods error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('donor_id', 'name phone email');

    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    const formattedFood = {
      id: food._id,
      food_name: food.food_name,
      quantity: food.quantity,
      distance_text: food.distance_text,
      phone: food.phone,
      notes: food.notes,
      latitude: food.latitude,
      longitude: food.longitude,
      status: food.status,
      created_at: food.createdAt,
      donor_name: food.donor_id.name,
      donor_phone: food.donor_id.phone,
      donor_email: food.donor_id.email
    };

    res.json({ food: formattedFood });
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Claim food (NGO only)
router.post('/:id/claim', authenticateNGO, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food || food.status !== 'available') {
      return res.status(404).json({ error: 'Food not found or already claimed' });
    }

    // Update food status
    food.status = 'claimed';
    await food.save();

    // Insert into history
    await FoodHistory.create({
      food_id: food._id,
      donor_id: food.donor_id,
      ngo_id: req.userId,
      food_name: food.food_name,
      quantity: food.quantity,
      distance_text: food.distance_text,
      phone: food.phone,
      latitude: food.latitude,
      longitude: food.longitude
    });

    res.json({ message: 'Food claimed successfully' });
  } catch (error) {
    console.error('Claim food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
