import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
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
  notes: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  status: {
    type: String,
    enum: ['available', 'claimed'],
    default: 'available'
  }
}, {
  timestamps: true
});

export default mongoose.model('Food', foodSchema);
