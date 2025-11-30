import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const { user, userType, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ donors: 0, ngos: 0 });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      const data = await response.json();
      if (response.ok) {
        setStats({ donors: data.donors, ngos: data.ngos });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">🌱 Surplus to Serve</Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/history">History</Link></li>
          
          {!user && (
            <>
              <li>
                <Link to="/donor/login" style={{ position: 'relative', display: 'inline-block' }}>
                  Donors
                  <span style={{ 
                    position: 'absolute', 
                    top: '-8px', 
                    right: '-12px', 
                    background: '#10b981', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '10px', 
                    fontSize: '0.7rem', 
                    fontWeight: '700',
                    minWidth: '20px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {stats.donors}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/ngo/login" style={{ position: 'relative', display: 'inline-block' }}>
                  NGOs
                  <span style={{ 
                    position: 'absolute', 
                    top: '-8px', 
                    right: '-12px', 
                    background: '#10b981', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '10px', 
                    fontSize: '0.7rem', 
                    fontWeight: '700',
                    minWidth: '20px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {stats.ngos}
                  </span>
                </Link>
              </li>
            </>
          )}
          
          {user && userType === 'donor' && (
            <>
              <li><Link to="/donor/dashboard">Dashboard</Link></li>
              <li><Link to="/events/add">Add Event</Link></li>
              <li><button onClick={handleLogout} style={{padding: '0.5rem 1.5rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s'}} onMouseOver={(e) => e.target.style.background = '#b91c1c'} onMouseOut={(e) => e.target.style.background = '#dc2626'}>Logout</button></li>
            </>
          )}
          
          {user && userType === 'ngo' && (
            <>
              <li><Link to="/food-list">Food List</Link></li>
              <li><Link to="/events">View Events</Link></li>
              <li><button onClick={handleLogout} style={{padding: '0.5rem 1.5rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s'}} onMouseOver={(e) => e.target.style.background = '#b91c1c'} onMouseOut={(e) => e.target.style.background = '#dc2626'}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
