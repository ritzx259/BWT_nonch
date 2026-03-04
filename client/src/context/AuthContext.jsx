import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use relative path for proxy
  const API_URL = '/api/auth';

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login to:', `${API_URL}/login`, { email });
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      console.log('Login success:', data);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Login error details:', error);
      const message = error.response?.data?.message || error.message;
      throw message;
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('Attempting register to:', `${API_URL}/register`, { name, email });
      const { data } = await axios.post(`${API_URL}/register`, { name, email, password });
      console.log('Register success:', data);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Register error details:', error);
      const message = error.response?.data?.message || error.message;
      throw message;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const updateProfile = async (profileData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(`${API_URL}/profile`, profileData, config);
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };

  const demoLogin = () => {
    const mockUser = {
      _id: 'demo_user_123',
      name: 'Demo User',
      email: 'demo@finai.com',
      role: 'user',
      token: 'mock_token_xyz',
      financialData: {
        monthlyExpenses: { rent: 1200, food: 400, transport: 150, others: 200 }
      }
    };
    setUser(mockUser);
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, demoLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
