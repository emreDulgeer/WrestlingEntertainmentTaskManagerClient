import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const matchApi = axios.create({
  baseURL: `${API_BASE_URL}/match`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMatches = async (showId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.get('/', {
      params: { showId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    throw error;
  }
};

export const getMatchesByShowId = async (showId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.get('/', {
      params: { showId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch matches by ShowId:', error.response?.data || error.message);
    throw error;
  }
};
export const getMatchById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch match by id:', error.response?.data || error.message);
    throw error;
  }
};
export const createMatch = async (matchData) => {
  console.log('Match data Api:', matchData);
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.post('/', matchData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Match created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Match creation failed:', error.response?.data || error.message);
    throw error;
  }
};
export const updateMatch = async (id, matchData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.put(`/${id}`, matchData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update match:', error.response?.data || error.message);
    throw error;
  }
};

// Match Sil
export const deleteMatch = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await matchApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete match:', error.response?.data || error.message);
    throw error;
  }
};
export default matchApi;
