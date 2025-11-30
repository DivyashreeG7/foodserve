import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DonorRegister from './pages/DonorRegister';
import DonorLogin from './pages/DonorLogin';
import DonorDashboard from './pages/DonorDashboard';
import NGORegister from './pages/NGORegister';
import NGOLogin from './pages/NGOLogin';
import NGOVerifySecret from './pages/NGOVerifySecret';
import FoodList from './pages/FoodList';
import FoodDetails from './pages/FoodDetails';
import History from './pages/History';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    
    if (token && type && userData) {
      setUser(JSON.parse(userData));
      setUserType(type);
    }
  }, []);

  const login = (userData, type, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor/register" element={<DonorRegister />} />
          <Route path="/donor/login" element={<DonorLogin />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/ngo/register" element={<NGORegister />} />
          <Route path="/ngo/login" element={<NGOLogin />} />
          <Route path="/ngo/verify-secret" element={<NGOVerifySecret />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/history" element={<History />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/add" element={<AddEvent />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
