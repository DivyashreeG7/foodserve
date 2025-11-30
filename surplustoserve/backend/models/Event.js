import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  event_date: {
    type: Date,
    required: true
  },
  event_time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);
