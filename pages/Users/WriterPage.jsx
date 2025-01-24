import React from 'react';

const WriterPage = ({ writer }) => {
  if (!writer) {
    return <div className="text-red-500">No Writer details available.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-green-900 to-green-600 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-3xl font-bold text-white mb-4">Writer Details</h2>
      <div className="text-white">
        <p><strong>Full Name:</strong> {writer.FullName}</p>
      </div>
    </div>
  );
};

export default WriterPage;
