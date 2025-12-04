import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';
import API_BASE_URL from '../api';

function FoodDetails() {
  const { id } = useParams();
  const { user, userType } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || userType !== 'ngo') {
      navigate('/ngo/login');
      return;
    }
    fetchFood();
  }, [id, user, userType, navigate]);

  const fetchFood = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/foods/${id}`);
      const data = await response.json();
      if (response.ok) {
        setFood(data.food);
      } else {
        setError('Food not found');
      }
    } catch (err) {
      setError('Error loading food details');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setClaiming(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/foods/${id}/claim`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to claim food');
      }

      setSuccess('✅ Selection Successful! Food has been claimed. Redirecting...');
      setTimeout(() => {
        navigate('/food-list');
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading food details...</div>
      </>
    );
  }

  if (error && !food) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card" style={{ maxWidth: '700px', margin: '2rem auto' }}>
          <h2 className="card-title">Food Donation Details</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {success && (
            <div className="alert alert-success" style={{ fontSize: '1.2rem', padding: '1.5rem', textAlign: 'center' }}>
              {success}
            </div>
          )}

          {food && (
            <>
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#2c3e50', textAlign: 'center' }}>
                  🍽️ {food.food_name}
                </h3>
                <div style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
                  <span className={`status-badge status-${food.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                    {food.status === 'available' ? '✅ Available' : '❌ Claimed'}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>
                  📦 Food Details
                </h4>
                
                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Quantity:</strong> {food.quantity}
                </div>

                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Status:</strong>{' '}
                  <span className={`status-badge status-${food.status}`}>
                    {food.status}
                  </span>
                </div>

                {food.distance_text && (
                  <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                    <strong>Location/Distance:</strong> {food.distance_text}
                  </div>
                )}

                {food.latitude && food.longitude && (
                  <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                    <strong>GPS Coordinates:</strong> {food.latitude}, {food.longitude}
                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${food.latitude},${food.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3498db' }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                )}

                {food.notes && (
                  <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                    <strong>Notes:</strong> {food.notes}
                  </div>
                )}

                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Posted:</strong> {new Date(food.created_at).toLocaleString()}
                </div>
              </div>

              <div style={{ borderTop: '2px solid #ddd', paddingTop: '1.5rem', marginTop: '1.5rem', background: '#f0f8ff', padding: '1.5rem', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#2c3e50', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem' }}>
                  👤 Donor Information
                </h4>
                
                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Name:</strong> {food.donor_name}
                </div>

                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Phone:</strong> {food.donor_phone}
                </div>

                <div className="food-info" style={{ marginBottom: '0.75rem' }}>
                  <strong>Email:</strong> {food.donor_email}
                </div>
              </div>

              {food.status === 'available' && !success && (
                <button
                  onClick={handleClaim}
                  className="btn btn-success"
                  disabled={claiming}
                  style={{ width: '100%', marginTop: '2rem', fontSize: '1.2rem', padding: '1rem' }}
                >
                  {claiming ? '⏳ Processing...' : '✅ Select This Food & Confirm Pickup'}
                </button>
              )}

              {food.status === 'claimed' && (
                <div className="alert alert-info" style={{ marginTop: '2rem' }}>
                  This food has already been claimed.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FoodDetails;
