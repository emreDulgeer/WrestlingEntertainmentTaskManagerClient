import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login fonksiyonu
export const login = async (credentials) => {
  try {
    console.log('Login request initiated with credentials:', credentials);
    const response = await api.post('/Auth/Login', credentials);
    console.log('Login successful. API Response:', response.data);
    return response.data; // Sadece token'ı döndürüyoruz
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Change Password fonksiyonu
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
    console.log('Change Password request initiated with data:', passwordData);
    const response = await api.post('/Auth/ChangePassword', passwordData, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer Token ekliyoruz
      },
    });
    console.log('Password changed successfully. API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Password change failed:', error.response?.data || error.message);
    throw error; // Hatanın üst bileşene taşınmasını sağlıyoruz
  }
};

export default api;
