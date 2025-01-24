import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const participantApi = axios.create({
  baseURL: `${API_BASE_URL}/matchParticipant`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMatchParticipants = async (matchId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await participantApi.get('/', {
      params: { matchId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch match participants:', error);
    throw error;
  }
};

export const createMatchParticipant = async (participantData) => {
  console.log('Participant data Api:', participantData);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/MatchParticipant`, participantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Match participant created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create match participant:", error);
    throw error;
  }
};
export const updateMatchParticipant = async (id, participantData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await participantApi.put(`/${id}`, participantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update match participant:', error.response?.data || error.message);
    throw error;
  }
};

// Match Participant Sil
export const deleteMatchParticipant = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await participantApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete match participant:', error.response?.data || error.message);
    throw error;
  }
};

export default participantApi;
