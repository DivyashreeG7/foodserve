import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function DonorRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/donors/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      login(data.donor, 'donor', data.token);
      navigate('/donor/dashboard');
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
          <h2 className="card-title">Donor Registration</h2>
          
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Already have an account? <Link to="/donor/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default DonorRegister;
