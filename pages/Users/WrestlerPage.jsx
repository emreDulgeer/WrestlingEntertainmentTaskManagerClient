import React from 'react';

const WrestlerPage = ({ wrestler }) => {
  if (!wrestler) {
    return <div className="text-red-500">No wrestler details available.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-red-900 to-red-600 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-3xl font-bold text-white mb-4">Wrestler Details</h2>
      <div className="text-white">
        <p><strong>Full Name:</strong> {wrestler.FullName}</p>
        <p><strong>Ring Name:</strong> {wrestler.Nickname}</p>
        <p><strong>Brand:</strong> {wrestler.Brand}</p>
        <p><strong>Gender:</strong> {wrestler.Gender}</p>
        <p><strong>Fight Style:</strong> {wrestler.FightStyle}</p>
        <p><strong>Hometown:</strong> {wrestler.Hometown}</p>
        <p><strong>Nationality:</strong> {wrestler.Nationality}</p>
        <p><strong>Height:</strong> {wrestler.Height} cm</p>
        <p><strong>Weight:</strong> {wrestler.Weight} kg</p>
        <p><strong>Alignment:</strong> {wrestler.HeelOrFace}</p>
      </div>
    </div>
  );
};

export default WrestlerPage;
