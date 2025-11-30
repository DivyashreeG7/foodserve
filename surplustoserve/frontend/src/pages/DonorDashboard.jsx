import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function DonorDashboard() {
  const { user, userType } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_name: '',
    quantity: '',
    distance_text: '',
    phone: user?.phone || '',
    notes: '',
    latitude: null,
    longitude: null
  });
  const [myFoods, setMyFoods] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (!user || userType !== 'donor') {
      navigate('/donor/login');
      return;
    }
    fetchMyFoods();
    
    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchMyFoods();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [user, userType, navigate]);

  const fetchMyFoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/foods/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setMyFoods(data.foods);
      }
    } catch (err) {
      console.error('Error fetching foods:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const captureLocation = () => {
    setLocationLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setSuccess('Location captured successfully!');
        setLocationLoading(false);
      },
      (error) => {
        setError('Unable to retrieve location. Please enable location services.');
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/foods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add food');
      }

      setSuccess('Food added successfully!');
      setFormData({
        food_name: '',
        quantity: '',
        distance_text: '',
        phone: user?.phone || '',
        notes: '',
        latitude: null,
        longitude: null
      });
      fetchMyFoods();
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
        <h1 style={{ marginBottom: '2rem' }}>Donor Dashboard</h1>

        <div className="card">
          <h2 className="card-title">Add Surplus Food</h2>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Food Name *</label>
              <input
                type="text"
                name="food_name"
                className="form-input"
                value={formData.food_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <input
                type="text"
                name="quantity"
                className="form-input"
                placeholder="e.g., 50 plates, 10 kg"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Distance/Area</label>
              <input
                type="text"
                name="distance_text"
                className="form-input"
                placeholder="e.g., Downtown, 5km from city center"
                value={formData.distance_text}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes (Optional)</label>
              <textarea
                name="notes"
                className="form-textarea"
                placeholder="Any additional information..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <button
                type="button"
                onClick={captureLocation}
                className="btn btn-secondary"
                disabled={locationLoading}
              >
                {locationLoading ? 'Capturing...' : formData.latitude ? '✓ Location Captured' : '📍 Capture My Location'}
              </button>
              {formData.latitude && (
                <p style={{ marginTop: '0.5rem', color: '#27ae60' }}>
                  Lat: {formData.latitude.toFixed(6)}, Lng: {formData.longitude.toFixed(6)}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Food'}
            </button>
          </form>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title">My Posted Foods</h2>
            <div style={{ color: '#3498db', fontSize: '0.9rem' }}>
              🔄 Auto-refreshing every 5 seconds
            </div>
          </div>
          {myFoods.length === 0 ? (
            <p>No foods posted yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Posted On</th>
                </tr>
              </thead>
              <tbody>
                {myFoods.map((food) => (
                  <tr key={food.id}>
                    <td>{food.food_name}</td>
                    <td>{food.quantity}</td>
                    <td>
                      <span className={`status-badge status-${food.status}`}>
                        {food.status}
                      </span>
                    </td>
                    <td>{new Date(food.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default DonorDashboard;
