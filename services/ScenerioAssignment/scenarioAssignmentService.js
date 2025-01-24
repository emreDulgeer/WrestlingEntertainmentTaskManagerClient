import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getScenarioAssignments = async (scenarioId) => {
    try {
      console.log('Fetching scenario assignments for scenarioId:', scenarioId); // ID'yi kontrol edin
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/ScenarioAssignment`, { 
        params: { scenarioId },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Scenario assignments response:', response.data); // Dönen veriyi kontrol edin
      return response.data;
    } catch (error) {
      console.error(
        `Failed to fetch scenario assignments for scenarioId=${scenarioId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  };
  export const createScenarioAssignment = async (assignmentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/ScenarioAssignment`, assignmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create scenario assignment:', error.response?.data || error.message);
      throw error;
    }
  };
  export const deleteScenarioAssignment = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/ScenarioAssignment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Failed to delete scenario assignment:', error);
      throw error;
    }
  };

export default {
  getScenarioAssignments,
  createScenarioAssignment,
  deleteScenarioAssignment,
};
