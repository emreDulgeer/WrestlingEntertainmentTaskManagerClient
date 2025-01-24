import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get promos by Show ID
export const getPromosByShowId = async (showId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/Promo`, {
        params: { showId }, // Ensure showId is passed correctly
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch promos by Show ID:', error);
      throw error;
    }
  };

// Get promo details by ID
export const getPromoById = async (promoId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/Promo/${promoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch promo by ID:', error);
    throw error;
  }
};
export const createPromo = async (promoPayload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/Promo`, promoPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create promo:', error);
    throw error;
  }
};
export const updatePromo = async (promoId, promoPayload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/Promo/${promoId}`, promoPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update promo:', error);
    throw error;
  }
};
export const deletePromo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/Promo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Silme işlemi başarılıysa dönen veriyi dön
  } catch (error) {
    console.error('Failed to delete promo:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  getPromosByShowId,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo
};
