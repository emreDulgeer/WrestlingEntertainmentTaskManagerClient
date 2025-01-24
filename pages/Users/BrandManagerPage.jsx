import React from 'react';

const BrandManagerPage = ({ brandManager }) => {
  if (!brandManager) {
    return <div className="text-red-500">No Brand Manager details available.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-600 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-3xl font-bold text-white mb-4">Brand Manager Details</h2>
      <div className="text-white">
        <p><strong>Full Name:</strong> {brandManager.FullName}</p>
        <p><strong>Brand:</strong> {brandManager.Brand}</p>
      </div>
    </div>
  );
};

export default BrandManagerPage;
