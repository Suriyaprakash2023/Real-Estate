import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from './data';
import { useNavigate } from 'react-router-dom';


// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole,setUserRole] = useState('')

  // // Fetch user data on mount if token is available
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIsAuthenticated(true);
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setIsAuthenticated(false);
        setUserData(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Async login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, { email, password },{
        // header:{
        //   "Content-Type":"Json/"
        // }
      });
      if (response.status ===200){
        const { tokens, user } = response.data;
        localStorage.setItem('token', response.data.tokens);
        localStorage.setItem('accessToken', response.data.tokens.access);
        localStorage.setItem('userRole',  response.data.groups);
        setIsAuthenticated(true);
        setLoading(false)
        setUserData(response.data);
        setUserRole(response.data.groups)
      }
      
      
    } catch (err) {
      console.error('Login failed:', err);
      throw new Error('Authentication failed');
    }
  };

  // Logout function (clear token and reset state)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/')
    
  };
console.log(isAuthenticated,"isAuthenticated")
  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, loading, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;