import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL;

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    
    // Set up auto-refresh every 5 seconds to catch new events
    const interval = setInterval(fetchEvents, 5000);
    
    // Refetch when window gains focus
    const handleFocus = () => {
      console.log('Window focused, refetching events');
      fetchEvents();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events from:', `${API_URL}/events`);
      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();
      console.log('Events response:', data);
      if (response.ok) {
        setEvents(data.events || []);
        console.log('Events set:', data.events?.length || 0);
      } else {
        console.error('Failed to fetch events:', data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading events...</div>
      </>
    );
  }

  const handleRefresh = () => {
    setLoading(true);
    fetchEvents();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Upcoming Community Events</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Food donation events organized by donors in your community
            </p>
          </div>
          <button 
            onClick={handleRefresh} 
            className="btn btn-secondary"
            disabled={loading}
            style={{ minWidth: '120px' }}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>

        {events.length === 0 ? (
          <div className="card">
            <p>No upcoming events at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-2" style={{ marginTop: '2rem' }}>
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  📅 {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                </div>
                <h3 className="event-title">{event.title}</h3>
                <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {event.description}
                </p>
                <div className="event-venue">
                  📍 {event.venue}
                </div>
                <div className="event-ngo">
                  Organized by: {event.donor_name}
                </div>
                <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.875rem' }}>
                  Contact: {event.donor_phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Events;
