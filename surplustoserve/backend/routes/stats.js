import express from 'express';
import Donor from '../models/Donor.js';
import NGO from '../models/NGO.js';
import Food from '../models/Food.js';
import FoodHistory from '../models/FoodHistory.js';

const router = express.Router();

// Get platform statistics
router.get('/', async (req, res) => {
  try {
    const [donorCount, ngoCount, foodCount, historyCount] = await Promise.all([
      Donor.countDocuments(),
      NGO.countDocuments(),
      Food.countDocuments({ status: 'available' }),
      FoodHistory.countDocuments()
    ]);

    res.json({
      donors: donorCount,
      ngos: ngoCount,
      availableFood: foodCount,
      completedDonations: historyCount
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
