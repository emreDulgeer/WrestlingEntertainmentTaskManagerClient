import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWrestlerById, deleteWrestler } from '../../services/Wrestler/wrestlerService';
import { useAuth } from '../../context/AuthContext';

const WrestlerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [wrestler, setWrestler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const role = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userBrand = auth.user.Brand; // Token'dan gelen Brand bilgisi

  useEffect(() => {
    const fetchWrestler = async () => {
      try {
        const data = await getWrestlerById(id);
        setWrestler(data);
      } catch (err) {
        setError('Failed to load wrestler details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWrestler();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this wrestler?')) {
      try {
        await deleteWrestler(id);
        alert('Wrestler deleted successfully!');
        navigate('/wrestlers');
      } catch (error) {
        console.error('Failed to delete wrestler:', error);
        alert('Failed to delete wrestler. Please try again.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/wrestler/edit/${id}`);
  };

  if (loading) {
    return <p>Loading wrestler details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const canEditOrDelete =
    (role === 'General Manager' || (role === 'Brand Manager' && userBrand === wrestler.Brand));

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{wrestler.FullName}</h1>
      <div className="space-y-4">
        <p><strong>Nickname:</strong> {wrestler.Nickname}</p>
        <p><strong>Brand:</strong> {wrestler.Brand}</p>
        <p><strong>Gender:</strong> {wrestler.Gender}</p>
        <p><strong>Fight Style:</strong> {wrestler.FightStyle}</p>
        <p><strong>Hometown:</strong> {wrestler.Hometown}</p>
        <p><strong>Nationality:</strong> {wrestler.Nationality}</p>
        <p><strong>Height:</strong> {wrestler.Height} cm</p>
        <p><strong>Weight:</strong> {wrestler.Weight} kg</p>
        <p><strong>Alignment:</strong> {wrestler.HeelOrFace}</p>
      </div>

      {/* Edit ve Delete Butonları */}
      {canEditOrDelete && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default WrestlerDetailPage;
