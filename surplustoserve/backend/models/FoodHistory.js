import mongoose from 'mongoose';

const foodHistorySchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  food_name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  distance_text: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  claimed_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('FoodHistory', foodHistorySchema);
