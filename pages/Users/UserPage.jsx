import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser, deleteUser } from '../../services/User/userService';
import { useAuth } from '../../context/AuthContext';
import WrestlerPage from './WrestlerPage';
import BrandManagerPage from './BrandManagerPage';
import WriterPage from './WriterPage';
import CoachPage from './CoachPage';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // General Manager kontrolü
  const isGeneralManager = auth.user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "General Manager";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDeleteUser = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteUser(user.Id);
      alert('User deleted successfully!');
      navigate('/users'); // Kullanıcı listesine yönlendir
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user.');
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
      <h1 className="text-3xl font-bold text-white mb-4">User Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6 text-black">
        <p><strong>Full Name:</strong> {user.FullName}</p>
        <p><strong>Nickname:</strong> {user.Nickname || 'No nickname'}</p>
        <p><strong>Email:</strong> {user.Email}</p>
        <p><strong>Phone Number:</strong> {user.PhoneNumber}</p>
      </div>

      {/* Rollere Özel Sayfalar */}
      {user.Roles.includes('Wrestler') && <WrestlerPage wrestler={user.Wrestler} />}
      {user.Roles.includes('Brand Manager') && <BrandManagerPage brandManager={user.BrandManager} />}
      {user.Roles.includes('Writer') && <WriterPage writer={user.Writer} />}
      {user.Roles.includes('Coach') && <CoachPage coach={user.Coach} />}

      {/* Edit ve Delete Butonları */}
      {isGeneralManager && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => navigate(`/user/edit/${user.Id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
