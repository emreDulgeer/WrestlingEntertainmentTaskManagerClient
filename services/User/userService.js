import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const userApi = axios.create({
  baseURL: `${API_BASE_URL}/User`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Kullanıcı bilgilerini ID ile al
export const getUserById = async (id) => {
  try {
    const response = await userApi.get(`/${id}`, {
      headers: addAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı:', error.response?.data || error.message);
    throw error;
  }
};

// Tüm kullanıcıları al
export const getAllUsers = async (pageNumber, pageSize) => {
  try {
    const response = await userApi.get('/', {
      params: { pageNumber, pageSize },
      headers: addAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Kullanıcılar alınamadı:', error.response?.data || error.message);
    throw error;
  }
};

// Kullanıcıyı güncelle
export const updateUser = async (id, updatedData) => {
  try {
    const response = await userApi.put(`/${id}`, updatedData, {
      headers: addAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Kullanıcı güncellenemedi:', error.response?.data || error.message);
    throw error;
  }
};

// Kullanıcıyı sil
export const deleteUser = async (id) => {
  try {
    const response = await userApi.delete(`/${id}`, {
      headers: addAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Kullanıcı silinemedi:', error.response?.data || error.message);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await userApi.post('/', userData, {
      headers: addAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Kullanıcı oluşturulamadı:', error.response?.data || error.message);
    throw error;
  }
};

// Servis fonksiyonlarını dışa aktar
const UserService = {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  createUser
};

export default UserService;
