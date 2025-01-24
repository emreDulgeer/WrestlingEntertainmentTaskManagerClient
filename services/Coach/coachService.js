import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const coachApi = axios.create({
  baseURL: `${API_BASE_URL}/Coach`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Yeni antrenör oluştur
export const createCoach = async (coachData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await coachApi.post('', coachData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Antrenör oluşturulamadı:', error.response?.data || error.message);
    throw error;
  }
};
export const getCoaches = async (params) => {
  try {
    const token = localStorage.getItem('token');
    const response = await coachApi.get('/', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coaches:', error);
    throw error;
  }
};
export const getCoachById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await coachApi.get(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coach details:', error);
    throw error;
  }
};
export default coachApi;
