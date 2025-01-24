import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const brandManagerApi = axios.create({
  baseURL: `${API_BASE_URL}/BrandManager`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Yeni marka yöneticisi oluştur
export const createBrandManager = async (brandManagerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await brandManagerApi.post('', brandManagerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Marka yöneticisi oluşturulamadı:', error.response?.data || error.message);
    throw error;
  }
};

export default brandManagerApi;
