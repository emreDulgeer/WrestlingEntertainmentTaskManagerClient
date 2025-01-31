import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoachNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-6">

      <button
        onClick={() => navigate('/shows')}
        className="text-white hover:underline"
      >
        Shows
      </button>
      <button
        onClick={() => navigate('/trainings')}
        className="text-white hover:underline"
      >
        Trainings
      </button>
      <button
        onClick={() => navigate('/reports')}
        className="text-white hover:underline"
      >
        Health and Performance Reports
      </button>
    </div>
  );
};

export default CoachNavbar;
