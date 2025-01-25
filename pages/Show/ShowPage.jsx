import React, { useEffect, useState } from 'react';
import { getShows } from '../../services/Show/showService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ShowPage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    isPayPerView: '',
    orderByDescending: true,
  });
  const navigate = useNavigate();
  const { auth } = useAuth(); 

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const data = await getShows(filters);
        setShows(data);
      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateShow = () => {
    navigate('/show/create'); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


  const userRole = auth?.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shows</h1>
        
        {userRole === 'General Manager' && (
          <button
            onClick={handleCreateShow}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Show
          </button>
        )}
      </div>

      
      <div className="mb-6 p-4 border rounded bg-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="">All Brands</option>
            <option value="Raw">Raw</option>
            <option value="Smackdown">Smackdown</option>
          </select>
          <select
            name="isPayPerView"
            value={filters.isPayPerView}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="">All Shows</option>
            <option value="true">Pay Per View</option>
            <option value="false">Regular Shows</option>
          </select>
          <select
            name="orderByDescending"
            value={filters.orderByDescending}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="true">Newest First</option>
            <option value="false">Oldest First</option>
          </select>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shows.map((show) => (
          <div
            key={show.Id}
            onClick={() => navigate(`/show/${show.Id}`)} 
            className={`p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
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

export default ShowPage;
