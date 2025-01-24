import React from 'react';

const CoachPage = ({ coach }) => {
  if (!coach) {
    return <div className="text-red-500">No Coach details available.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-purple-600 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-3xl font-bold text-white mb-4">Coach Details</h2>
      <div className="text-white">
        <p><strong>Full Name:</strong> {coach.FullName}</p>
        <p><strong>Brand:</strong> {coach.Brand}</p>
        <p><strong>Fight Style:</strong> {coach.FightStyle}</p>
      </div>
    </div>
  );
};

export default CoachPage;
