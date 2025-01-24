import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandManagerNavbar = () => {
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
        onClick={() => navigate('/wrestlers')}
        className="text-white hover:underline"
      >
        Wrestlers
      </button>
      <button
        onClick={() => navigate('/coaches')}
        className="text-white hover:underline"
      >
        Coaches
      </button>
      <button
        onClick={() => navigate('/trainings')}
        className="text-white hover:underline"
      >
        Trainings
      </button>
      <button
        onClick={() => navigate('/scenarios')}
        className="text-white hover:underline"
      >
        Scenerios
      </button>
    </div>
  );
};

export default BrandManagerNavbar;
