import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getScenarios = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/scenarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fetched Scenarios:', response.data); // Senaryoları logla
    return response.data;
  } catch (error) {
    console.error('Failed to fetch scenarios:', error.response?.data || error.message);
    throw error;
  }
};
export const getScenarioById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/scenarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch scenario:', error);
    throw error;
  }
};
export const createScenario = async (scenarioData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/scenarios`, scenarioData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create scenario:', error.response?.data || error.message);
      throw error;
    }
  };
export const deleteScenario = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/scenarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Scenario with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete scenario with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
export const updateScenario = async (id, scenarioData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/scenarios/${id}`, scenarioData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update scenario:', error);
    throw error;
  }
};

export default {
  deleteScenario,
  getScenarios,
  createScenario,
  updateScenario,
};
