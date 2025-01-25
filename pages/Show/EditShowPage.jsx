import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowById, updateShow } from '../../services/Show/showService';

const EditShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Date: '',
    Address: '',
    Brand: '',
    CommisionerGoal: '',
    IsPayPerView: false,
    ShowRaiting: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Session expired. Please log in again.');
      navigate('/');
    }
    console.log('Token in EditShowPage:', token);
  }, [navigate]);

  // Show detaylarını yükle
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const data = await getShowById(id);
        console.log('Fetched Show Data:', data);

        
        const formattedDate = data.Date
          ? new Date(data.Date).toISOString().slice(0, 16)
          : '';

        setFormData({
          ...data,
          Date: formattedDate, 
        });
      } catch (err) {
        setError('Failed to load show details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, ShowRaiting: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting Show Data:', formData);
      await updateShow(id, formData);
      alert('Show updated successfully!');
      navigate(`/show/${id}`);
    } catch (err) {
      console.error('Failed to update show:', err);
      alert('Failed to update the show.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Show</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <select
          name="Brand"
          value={formData.Brand}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select Brand</option>
          <option value="Raw">Raw</option>
          <option value="Smackdown">Smackdown</option>
        </select>
        <textarea
          name="CommisionerGoal"
          placeholder="Commissioner Goal"
          value={formData.CommisionerGoal}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="IsPayPerView"
            checked={formData.IsPayPerView}
            onChange={handleChange}
          />
          <span>Is Pay Per View</span>
        </label>

        {/* Show Rating */}
        <div className="space-y-2">
          <label className="block font-semibold">Show Rating:</label>
          <div className="flex space-x-2">
            {[...Array(10)].map((_, index) => {
              const rating = index + 1;
              return (
                <svg
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={rating <= formData.ShowRaiting ? 'gold' : 'gray'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              );
            })}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/show/${id}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShowPage;
