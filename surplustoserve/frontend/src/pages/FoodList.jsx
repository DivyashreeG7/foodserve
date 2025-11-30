import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function FoodList() {
  const { user, userType } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || userType !== 'ngo') {
      navigate('/ngo/login');
      return;
    }
    fetchFoods();
    
    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchFoods();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [user, userType, navigate]);

  const fetchFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/foods/available`);
      const data = await response.json();
      if (response.ok) {
        setFoods(data.foods);
      }
    } catch (err) {
      console.error('Error fetching foods:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading available foods...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>Available Food Donations</h1>
          <div style={{ color: '#27ae60', fontSize: '0.9rem' }}>
            🔄 Auto-refreshing every 5 seconds
          </div>
        </div>

        {foods.length === 0 ? (
          <div className="card">
            <p>No food donations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-2">
            {foods.map((food) => (
              <div key={food.id} className="food-card">
                <h3>{food.food_name}</h3>
                <div className="food-info">
                  <strong>Quantity:</strong> {food.quantity}
                </div>
                <div className="food-info">
                  <strong>Donor:</strong> {food.donor_name}
                </div>
                {food.distance_text && (
                  <div className="food-info">
                    <strong>Location:</strong> {food.distance_text}
                  </div>
                )}
                {food.latitude && food.longitude && (
                  <div className="food-info">
                    <strong>Coordinates:</strong> {food.latitude.toFixed(4)}, {food.longitude.toFixed(4)}
                  </div>
                )}
                <div className="food-info">
                  <strong>Contact:</strong> {food.donor_phone}
                </div>
                {food.notes && (
                  <div className="food-info">
                    <strong>Notes:</strong> {food.notes}
                  </div>
                )}
                <div className="food-info" style={{ color: '#999', fontSize: '0.875rem' }}>
                  Posted: {new Date(food.created_at).toLocaleString()}
                </div>
                <Link to={`/food/${food.id}`} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                  📋 View Full Details & Select Food
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FoodList;
