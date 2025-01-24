import React from 'react';
import { useNavigate } from 'react-router-dom';

const GeneralManagerNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-6">

      <button
        onClick={() => navigate('/shows')}
        className="text-white hover:underline"
      >
        Shows
      </button>
    </div>
  );
};

export default GeneralManagerNavbar;
