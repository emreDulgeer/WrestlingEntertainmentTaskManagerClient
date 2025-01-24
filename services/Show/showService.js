import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const showApi = axios.create({
  baseURL: `${API_BASE_URL}/show`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getShows = async (params) => {
  try {
    const token = localStorage.getItem('token');
    const response = await showApi.get('/', {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch shows:', error);
    throw error;
  }
};

export const getShowById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await showApi.get(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch show details:', error);
    throw error;
  }
};

// Show Güncelleme
export const updateShow = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await showApi.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update show:', error.response?.data || error.message);
    throw error;
  }
};

// Show Oluşturma
export const createShow = async (showData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await showApi.post('/', showData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create show:', error.response?.data || error.message);
    throw error;
  }
};

// Show Silme
export const deleteShow = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await showApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to delete show:', error.response?.data || error.message);
    throw error;
  }
};

export default showApi;
