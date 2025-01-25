import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getHealthPerformanceReports = async (filters) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/HealthPerformanceReports`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch health performance reports:", error);
    throw error;
  }
};
export const createHealthPerformanceReport = async (reportData) => {
    try {
      // Token'i localStorage'dan al
      const token = localStorage.getItem("token");
  
      const response = await axios.post(`${API_BASE_URL}/HealthPerformanceReports`, reportData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Failed to create health performance report:", error);
      throw error;
    }
};
export const deleteHealthPerformanceReport = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Token'ı alıyoruz
      await axios.delete(`${API_BASE_URL}/HealthPerformanceReports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to delete health performance report:", error);
      throw error;
    }
};