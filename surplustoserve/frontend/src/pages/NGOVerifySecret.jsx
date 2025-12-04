import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';
import API_BASE_URL from '../api';

function NGOVerifySecret() {
  const { user, userType } = useContext(AuthContext);
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || userType !== 'ngo') {
      navigate('/ngo/login');
    }
  }, [user, userType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ngos/validate-secret`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ngoId: user.id, secretKey })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid secret key');
      }

      navigate('/food-list');
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
        <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <h2 className="card-title">Verify Secret Key</h2>
          
          <div className="alert alert-info">
            Please enter your secret key to access the NGO dashboard.
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Secret Key</label>
              <input
                type="password"
                className="form-input"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NGOVerifySecret;
