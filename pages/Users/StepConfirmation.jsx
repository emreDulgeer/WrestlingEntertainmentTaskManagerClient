import React from 'react';

const StepConfirmation = ({ userData, roleData, onSubmit, onBack, onCancel }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
      <h3 className="font-bold">User Information</h3>
      <p><strong>Full Name:</strong> {userData.FullName}</p>
      <p><strong>Username:</strong> {userData.UserName}</p>
      <p><strong>Email:</strong> {userData.Email}</p>
      <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
      <p><strong>Role:</strong> {userData.Role}</p>
      <h3 className="font-bold mt-4">Role Information</h3>
      <pre>{JSON.stringify(roleData, null, 2)}</pre>
      <div className="flex space-x-4 my-4">
        <button onClick={onBack} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={onSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
          Create
        </button>
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StepConfirmation;
