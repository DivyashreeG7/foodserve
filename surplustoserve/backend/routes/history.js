import express from 'express';
import FoodHistory from '../models/FoodHistory.js';

const router = express.Router();

// Get food history
router.get('/', async (req, res) => {
  try {
    const history = await FoodHistory.find()
      .populate('donor_id', 'name phone')
      .populate('ngo_id', 'name phone')
      .sort({ claimed_at: -1 });

    const formattedHistory = history.map(item => ({
      id: item._id,
      food_name: item.food_name,
      quantity: item.quantity,
      distance_text: item.distance_text,
      phone: item.phone,
      latitude: item.latitude,
      longitude: item.longitude,
      claimed_at: item.claimed_at,
      donor_name: item.donor_id.name,
      donor_phone: item.donor_id.phone,
      ngo_name: item.ngo_id.name,
      ngo_phone: item.ngo_id.phone
    }));

    res.json({ history: formattedHistory });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
