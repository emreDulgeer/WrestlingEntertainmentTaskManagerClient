import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShows } from '../../services/Show/showService';
import { useAuth } from '../../context/AuthContext';

const WriterDashboard = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth(); 

  useEffect(() => {
    const fetchShows = async () => {
      try {
        
        const userBrand = auth?.user?.Brand;

        if (!userBrand) {
          setError('Brand bilgisi bulunamadı.');
          setLoading(false);
          return;
        }

        console.log('Fetching shows for brand:', userBrand);

        
        const data = await getShows({ brand: userBrand, orderByDescending: true });
        setShows(data);
      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [auth]);

  const handleShowClick = (showId) => {
    navigate(`/show/${showId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Writer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shows.map((show) => (
          <div
            key={show.Id}
            onClick={() => handleShowClick(show.Id)}
            className={`p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:opacity-90 ${
              show.Brand === 'Raw'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <h2 className="text-xl font-bold">{show.FormattedDate}</h2>
            <p>{show.Address}</p>
            <p className="font-semibold">{show.Brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WriterDashboard;
