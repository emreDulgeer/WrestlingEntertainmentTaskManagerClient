import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get promo assignments by Promo ID
export const getPromoAssignmentsByPromoId = async (promoId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/PromoAssignments`, {
        params: { promoId }, // Ensure promoId is passed correctly
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch promo assignments by Promo ID:', error);
      throw error;
    }
  };

// Get promo assignment details by ID
export const getPromoAssignmentById = async (assignmentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/PromoAssignments/${assignmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch promo assignment by ID:', error);
    throw error;
  }
};
export const createPromoAssignment = async (assignmentPayload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/PromoAssignments`, assignmentPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create promo assignment:', error);
    throw error;
  }
};
export const deletePromoAssignment = async (assignmentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/PromoAssignments/${assignmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete promo assignment:', error);
    throw error;
  }
};

export default {
  getPromoAssignmentsByPromoId,
  getPromoAssignmentById,
  createPromoAssignment,
  deletePromoAssignment,
};
