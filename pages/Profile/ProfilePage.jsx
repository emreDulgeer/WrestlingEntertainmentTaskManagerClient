import React, { useState, useEffect } from 'react';
import ChangePasswordForm from '../../components/Auth/ChangePasswordForm';
import UserService from '../../services/User/userService';
import decodeMyToken from '../../src/utils/decodeMyToken';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token bulunamadı!');
        const decodedToken = decodeMyToken(token);
        const userId = decodedToken?.UserId;
        if (!userId) throw new Error('Kullanıcı ID alınamadı!');
        const data = await UserService.getUserById(userId);
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-black to-red-900 text-white">
      <div className="bg-black p-6 rounded-lg shadow-2xl max-w-xl w-full my-16">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Profile</h1>
        <div className="space-y-4">
          <p><strong>Full Name:</strong> {userData.FullName}</p>
          <p><strong>User Name:</strong> {userData.UserName}</p>
          <p><strong>Roles:</strong> {userData.Roles.join(', ')}</p>
        </div>
        <button
          onClick={() => setShowChangePassword(true)}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Change Password
        </button>
      </div>

      {showChangePassword && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
          <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
