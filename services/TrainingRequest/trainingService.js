import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const trainingApi = axios.create({
  baseURL: `${API_BASE_URL}/TrainingRequest`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tüm Training Request'leri al (opsiyonel parametrelerle filtrelenmiş)
export const getTrainingRequests = async (params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await trainingApi.get('', {
      params, // API'ye query parametreleri gönder
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Training Request verilerini döndür
  } catch (error) {
    console.error('Failed to fetch training requests:', error);
    throw error;
  }
};

// Belirli bir Training Request'i ID'ye göre al
export const getTrainingRequestById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await trainingApi.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Training Request detayını döndür
  } catch (error) {
    console.error('Failed to fetch training request by ID:', error);
    throw error;
  }
};

// Yeni Training Request oluştur
export const createTrainingRequest = async (trainingRequestData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await trainingApi.post('', trainingRequestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Oluşturulan Training Request'i döndür
  } catch (error) {
    console.error('Failed to create training request:', error.response?.data || error.message);
    throw error;
  }
};

// Training Request'i ID'ye göre güncelle
export const updateTrainingRequest = async (id, trainingRequestData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await trainingApi.put(`/${id}`, trainingRequestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Güncellenen Training Request'i döndür
  } catch (error) {
    console.error('Failed to update training request:', error.response?.data || error.message);
    throw error;
  }
};

// Training Request'i ID'ye göre sil
export const deleteTrainingRequest = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await trainingApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to delete training request:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  getTrainingRequests,
  getTrainingRequestById,
  createTrainingRequest,
  updateTrainingRequest,
  deleteTrainingRequest,
};
