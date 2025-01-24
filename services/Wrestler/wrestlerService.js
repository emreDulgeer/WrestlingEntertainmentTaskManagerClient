import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const wrestlerApi = axios.create({
  baseURL: `${API_BASE_URL}/Wrestlers`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Yeni güreşçi oluştur
export const createWrestler = async (wrestlerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await wrestlerApi.post('', wrestlerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Güreşçi oluşturulamadı:', error.response?.data || error.message);
    throw error;
  }
};
export const getWrestlers = async (params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/Wrestlers`, {
      params: {
        ...params, // API'ye query parametreleri iletmek için
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Yanıtı kontrol et ve `Item1` ve `Item2`yi döndür
    if (response.data && Array.isArray(response.data.Item1) && typeof response.data.Item2 === 'number') {
      return {
        wrestlers: response.data.Item1,
        total: response.data.Item2,
      };
    } else {
      console.error('Unexpected API response:', response.data);
      throw new Error('Invalid API response format.');
    }
  } catch (error) {
    console.error('Failed to fetch wrestlers:', error);
    throw error;
  }
};


export const getWrestlerById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await wrestlerApi.get(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wrestler details:', error);
    throw error;
  }
};
export const updateWrestler = async (id, wrestlerData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await wrestlerApi.put(`/${id}`, wrestlerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update wrestler:', error.response?.data || error.message);
    throw error;
  }
};
export const deleteWrestler = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await wrestlerApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to delete wrestler:', error.response?.data || error.message);
    throw error;
  }
};
export default wrestlerApi;
