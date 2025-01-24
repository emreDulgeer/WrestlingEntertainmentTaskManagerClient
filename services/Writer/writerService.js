import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const writerApi = axios.create({
  baseURL: `${API_BASE_URL}/Writer`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Yeni yazar oluştur
export const createWriter = async (writerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await writerApi.post('', writerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Yazar oluşturulamadı:', error.response?.data || error.message);
    throw error;
  }
};
export const getWriters = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await writerApi.get('/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch writers:', error);
    throw error;
  }
};
export const getWriterById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await writerApi.get(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch writer details:', error);
    throw error;
  }
};
export default writerApi;
