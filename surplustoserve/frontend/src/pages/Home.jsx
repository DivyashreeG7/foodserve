import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [stats, setStats] = useState({ donors: 0, ngos: 0, availableFood: 0, completedDonations: 0 });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)', padding: '4rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '52% 48%', gap: '4rem', alignItems: 'start', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
            
            {/* Left Side - Content & Image */}
            <div>
              <h1 style={{ fontSize: '3.8rem', fontWeight: '800', marginBottom: '1.25rem', color: '#047857', lineHeight: '1.15', letterSpacing: '-1.5px' }}>
                From Surplus<br />to Serve
              </h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: '#64748b', lineHeight: '1.85', maxWidth: '540px' }}>
                Connecting generous donors with NGOs to fight hunger and reduce food waste. Every meal shared is a life touched.
              </p>

              {/* Image */}
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(5, 150, 105, 0.12)', border: '1px solid rgba(16, 185, 129, 0.1)', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&h=600&fit=crop" 
                  alt="Food donation - sharing surplus food" 
                  style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} 
                />
                {/* Overlay gradient for depth */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
              </div>
            </div>

            {/* Right Side - Login Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '3rem' }}>
              
              {/* Donor Card */}
              <Link 
                to="/donor/login" 
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  padding: '1.5rem 1.75rem', 
                  borderRadius: '16px', 
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.25)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  display: 'block',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-3px)'; 
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(5, 150, 105, 0.35)';
                }}
                onMouseOut={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(5, 150, 105, 0.25)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '2.25rem', lineHeight: '1' }}>🍽️</div>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.3px' }}>
                        Donors
                      </h2>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', margin: '0.15rem 0 0', fontWeight: '500' }}>
                        Share surplus food
                      </p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.25)', padding: '0.35rem 0.75rem', borderRadius: '16px', color: 'white', fontWeight: '800', fontSize: '1.1rem', minWidth: '45px', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    {stats.donors}
                  </div>
                </div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: '600', textAlign: 'center', marginTop: '0.85rem', padding: '0.6rem', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(5px)' }}>
                  Click to Login →
                </div>
              </Link>

              {/* NGO Card */}
              <Link 
                to="/ngo/login" 
                style={{ 
                  background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)', 
                  padding: '1.5rem 1.75rem', 
                  borderRadius: '16px', 
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(4, 120, 87, 0.25)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  display: 'block',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => { 
                  e.currentTarget.style.transform = 'translateY(-3px)'; 
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(4, 120, 87, 0.35)';
                }}
                onMouseOut={(e) => { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(4, 120, 87, 0.25)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '2.25rem', lineHeight: '1' }}>🏢</div>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.3px' }}>
                        NGOs
                      </h2>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', margin: '0.15rem 0 0', fontWeight: '500' }}>
                        Find food donations
                      </p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.25)', padding: '0.35rem 0.75rem', borderRadius: '16px', color: 'white', fontWeight: '800', fontSize: '1.1rem', minWidth: '45px', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    {stats.ngos}
                  </div>
                </div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: '600', textAlign: 'center', marginTop: '0.85rem', padding: '0.6rem', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(5px)' }}>
                  Click to Login →
                </div>
              </Link>

            </div>

          </div>
        </div>
      </div>



      {/* Features Section */}
      <div style={{ background: 'white', padding: '6rem 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#047857', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
              Three simple steps to make a difference in your community
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', padding: '3rem 2.5rem', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(5, 150, 105, 0.08)', transition: 'all 0.4s ease', border: '2px solid #e5e7eb', position: 'relative' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.08)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>1</div>
              <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto 2rem', fontSize: '3rem', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)' }}>
                🍽️
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: '#047857', fontWeight: '700' }}>For Donors</h3>
              <p style={{ color: '#64748b', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Register, post surplus food details with location, and connect with verified NGOs who need it.
              </p>
              <Link to="/donor/register" className="btn btn-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.9rem 1.5rem', fontSize: '1.05rem' }}>Get Started →</Link>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', padding: '3rem 2.5rem', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(5, 150, 105, 0.08)', transition: 'all 0.4s ease', border: '2px solid #e5e7eb', position: 'relative' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.08)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>2</div>
              <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto 2rem', fontSize: '3rem', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)' }}>
                🏢
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: '#047857', fontWeight: '700' }}>For NGOs</h3>
              <p style={{ color: '#64748b', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Browse available food donations, view locations, and claim pickups to serve those in need.
              </p>
              <Link to="/ngo/register" className="btn btn-success" style={{ marginTop: 'auto', width: '100%', padding: '0.9rem 1.5rem', fontSize: '1.05rem' }}>Join as NGO →</Link>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', padding: '3rem 2.5rem', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(5, 150, 105, 0.08)', transition: 'all 0.4s ease', border: '2px solid #e5e7eb', position: 'relative' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.08)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
              <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>3</div>
              <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto 2rem', fontSize: '3rem', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)' }}>
                📊
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: '#047857', fontWeight: '700' }}>Track Impact</h3>
              <p style={{ color: '#64748b', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1.05rem' }}>
                Track all completed food donations and see the impact we're making together in our community.
              </p>
              <Link to="/history" className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%', padding: '0.9rem 1.5rem', fontSize: '1.05rem' }}>View History →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div style={{ background: '#fafafa', padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#047857', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
              Making a Real Impact
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
              Our platform connects generous donors with organizations that serve communities in need
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transition: 'all 0.4s ease', background: 'white', border: '2px solid transparent' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop" alt="Food donation" style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>Fresh Food</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#047857', marginBottom: '0.75rem' }}>Fresh Food Donations</h3>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem' }}>Surplus food from restaurants and events ready to serve communities</p>
              </div>
            </div>
            
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transition: 'all 0.4s ease', background: 'white', border: '2px solid transparent' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop" alt="Community service" style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>NGO Partners</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#047857', marginBottom: '0.75rem' }}>Serving Communities</h3>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem' }}>NGOs distributing food to those in need across the community</p>
              </div>
            </div>
            
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transition: 'all 0.4s ease', background: 'white', border: '2px solid transparent' }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#10b981'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop" alt="Volunteers" style={{ width: '100%', height: '280px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>Together</div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#047857', marginBottom: '0.75rem' }}>Community Impact</h3>
                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.05rem' }}>Together fighting hunger and reducing food waste every day</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/history" className="btn btn-primary" style={{ fontSize: '1.15rem', padding: '1.1rem 3rem', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
              View Donation History →
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p style={{ fontSize: '1rem' }}>&copy; 2025 Surplus to Serve. Fighting food waste, feeding communities.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
