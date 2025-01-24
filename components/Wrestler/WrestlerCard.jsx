import React from 'react';
import { useNavigate } from 'react-router-dom';

const WrestlerCard = ({ wrestler }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/wrestler/${wrestler.Id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-4 bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-700"
    >
      <h2 className="text-xl font-bold">{wrestler.Nickname}</h2>
      <p><strong>Full Name:</strong> {wrestler.FullName}</p>
      <p><strong>Brand:</strong> {wrestler.Brand}</p>
      <p><strong>Gender:</strong> {wrestler.Gender}</p>
      <p><strong>Fight Style:</strong> {wrestler.FightStyle}</p>
      <p><strong>Hometown:</strong> {wrestler.Hometown}</p>
      <p><strong>Nationality:</strong> {wrestler.Nationality}</p>
      <p><strong>Height:</strong> {wrestler.Height} cm</p>
      <p><strong>Weight:</strong> {wrestler.Weight} kg</p>
      <p>
        <strong>Alignment:</strong>{' '}
        <span
          className={
            wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-500'
          }
        >
          {wrestler.HeelOrFace}
        </span>
      </p>
    </div>
  );
};

export default WrestlerCard;
