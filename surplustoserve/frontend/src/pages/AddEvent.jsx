import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function AddEvent() {
  const { user, userType } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    venue: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || userType !== 'donor') {
      navigate('/donor/login');
    }
  }, [user, userType, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add event');
      }

      setSuccess('Event added successfully! Redirecting...');
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card" style={{ maxWidth: '700px', margin: '2rem auto' }}>
          <h2 className="card-title">Add Community Event</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Share your food donation event with NGOs in your community
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Event Date *</label>
              <input
                type="date"
                name="event_date"
                className="form-input"
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Event Time *</label>
              <input
                type="time"
                name="event_time"
                className="form-input"
                value={formData.event_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Venue/Location *</label>
              <textarea
                name="venue"
                className="form-textarea"
                placeholder="Enter the event venue or location"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Adding Event...' : 'Add Event'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEvent;
