import express from 'express';
import Event from '../models/Event.js';
import Donor from '../models/Donor.js';
import { authenticateDonor } from '../middleware/auth.js';

const router = express.Router();

// Get all events (public - for NGOs to view)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('donor_id', 'name phone')
      .sort({ event_date: 1, event_time: 1 });

    console.log(`Found ${events.length} events in database`);

    // Filter out events where donor was deleted and format the rest
    const formattedEvents = events
      .filter(event => event.donor_id) // Only include events with valid donor
      .map(event => ({
        id: event._id,
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        event_time: event.event_time,
        venue: event.venue,
        created_at: event.createdAt,
        donor_name: event.donor_id.name,
        donor_phone: event.donor_id.phone
      }));

    console.log(`Returning ${formattedEvents.length} valid events`);
    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('donor_id', 'name phone email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const formattedEvent = {
      id: event._id,
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      event_time: event.event_time,
      venue: event.venue,
      created_at: event.createdAt,
      donor_name: event.donor_id.name,
      donor_phone: event.donor_id.phone,
      donor_email: event.donor_id.email
    };

    res.json({ event: formattedEvent });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add event (Donor only)
router.post('/', authenticateDonor, async (req, res) => {
  try {
    const { title, description, event_date, event_time, venue } = req.body;

    if (!title || !description || !event_date || !event_time || !venue) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Creating event with data:', { title, description, event_date, event_time, venue, donor_id: req.userId });

    const event = await Event.create({
      donor_id: req.userId,
      title,
      description,
      event_date,
      event_time,
      venue
    });

    console.log('Event created successfully:', event._id);

    res.status(201).json({
      message: 'Event added successfully',
      event: { id: event._id, title, event_date, event_time }
    });
  } catch (error) {
    console.error('Add event error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update event (Donor only - their own events)
router.put('/:id', authenticateDonor, async (req, res) => {
  try {
    const { title, description, event_date, event_time, venue } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.donor_id.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only edit your own events' });
    }

    event.title = title;
    event.description = description;
    event.event_date = event_date;
    event.event_time = event_time;
    event.venue = venue;
    await event.save();

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete event (Donor only - their own events)
router.delete('/:id', authenticateDonor, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.donor_id.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only delete your own events' });
    }

    await event.deleteOne();

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
