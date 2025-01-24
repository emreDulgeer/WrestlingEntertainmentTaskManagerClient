import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/User/userService';

const EditUserPage = () => {
  const { id } = useParams(); // URL'den gelen kullanıcı ID'si
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    FullName: '',
    UserName: '',
    Nickname: '',
    Email: '',
    PhoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserById(id); // Kullanıcı bilgilerini al
        setUser(data);
        setFormData({
          FullName: data.FullName || '',
          UserName: data.UserName || '',
          Nickname: data.Nickname || '',
          Email: data.Email || '',
          PhoneNumber: data.PhoneNumber || '',
        });
      } catch (err) {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, formData); // Kullanıcı bilgilerini güncelle
      alert('User updated successfully!');
      navigate(`/user/${id}`); // Kullanıcı detay sayfasına yönlendir
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user.');
    }
  };

  if (loading) {
    return <div className="text-white">Loading user details...</div>;
  }

  if (error || !user) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-black to-red-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="FullName" className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="FullName"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="UserName" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Nickname" className="block text-gray-700 font-bold mb-2">
            Nickname
          </label>
          <input
            type="text"
            id="Nickname"
            name="Nickname"
            value={formData.Nickname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="PhoneNumber" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
