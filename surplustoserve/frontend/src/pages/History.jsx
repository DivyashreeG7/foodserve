import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL;

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();
      if (response.ok) {
        setHistory(data.history);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading history...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Food Donation History</h1>

        {history.length === 0 ? (
          <div className="card">
            <p>No history records yet.</p>
          </div>
        ) : (
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Donor</th>
                  <th>Donor Phone</th>
                  <th>NGO</th>
                  <th>NGO Phone</th>
                  <th>Claimed At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>{item.food_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.donor_name}</td>
                    <td>{item.donor_phone}</td>
                    <td>{item.ngo_name}</td>
                    <td>{item.ngo_phone}</td>
                    <td>{new Date(item.claimed_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default History;
