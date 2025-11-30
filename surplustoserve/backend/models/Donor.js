import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Donor', donorSchema);
