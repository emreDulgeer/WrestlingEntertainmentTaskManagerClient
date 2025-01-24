import React, { useEffect, useState } from 'react';
import UserService from '../../services/User/userService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { auth } = useAuth(); // Giriş yapan kullanıcının bilgisi
  const navigate = useNavigate();

  // Kullanıcının General Manager olup olmadığını kontrol et
  const isGeneralManager =
    auth.user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "General Manager";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await UserService.getAllUsers(pageNumber, 24); // Kullanıcıları al
        setUsers(data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageNumber]);

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-black to-red-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Users</h1>

      {/* Create User Button */}
      {isGeneralManager && (
        <div className="mb-4">
            <button
            onClick={() => navigate('/user/create')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
            >
            Create User
            </button>

        </div>
      )}

      {/* Kullanıcı Kartları */}
      <div className="grid grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.Id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate(`/user/${user.Id}`)} // Kullanıcı sayfasına navigate
          >
            <h2 className="text-lg font-bold text-gray-800">{user.FullName}</h2>
            <p className="text-gray-500">{user.Nickname || 'No nickname'}</p>
            <p className="text-sm text-gray-400">{user.Roles.join(', ') || 'No roles'}</p>


          </div>
        ))}
      </div>

      {/* Sayfa Geçiş Butonları */}
      <div className="flex justify-center items-center mt-6">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-lg mr-2 disabled:opacity-50"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className="text-white mx-4">Page {pageNumber}</span>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-lg ml-2"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
