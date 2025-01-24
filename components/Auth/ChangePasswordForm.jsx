import React, { useState } from 'react';
import { changePassword } from '../../services/Auth/api';

const ChangePasswordForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(formData);
      setSuccess('Password changed successfully!');
      setError(null);
      setFormData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setError(error.message || 'Failed to change password');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md text-white">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">Change Password</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block font-semibold mb-2">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            placeholder="Enter current password"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block font-semibold mb-2">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Change Password
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
