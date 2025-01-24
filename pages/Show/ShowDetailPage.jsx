import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getShowById, deleteShow } from '../../services/Show/showService';
import MatchesComponent from '../../components/Match/MatchesComponent';
import PromosComponent from '../../components/Promo/PromosComponent';

const ShowDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowById(id);
        setShow(data);
      } catch (err) {
        setError('Failed to load show details.');
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  const handleEditShow = () => {
    navigate(`/show/edit/${id}`);
  };

  const handleDeleteShow = async () => {
    if (window.confirm('Are you sure you want to delete this show?')) {
      try {
        await deleteShow(id);
        alert('Show deleted successfully!');
        navigate('/shows'); // Show listesine yönlendirme
      } catch (err) {
        console.error('Failed to delete show:', err);
        alert('Failed to delete the show.');
      }
    }
  };

  const handleEditMatch = (match) => {
    navigate(`/match/edit/${match.Id}`, { state: { match } });
  };

  const handleCreateMatch = () => {
    navigate(`/show/${id}/create-match`);
  };

  const handleCreatePromo = () => {
    navigate(`/show/${id}/create-promo`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const userRole = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userBrand = auth.user.Brand; // Brand bilgisi doğrudan token'dan alınıyor


  const canEditOrDelete = userRole === 'General Manager';


  const canCreate =
    userRole === 'General Manager' || (userRole === 'Brand Manager' && show?.Brand === userBrand) ;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Show Details</h1>
        <div className="space-x-4">
          {canEditOrDelete && (
            <>
              <button
                onClick={handleEditShow}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit Show
              </button>
              <button
                onClick={handleDeleteShow}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete Show
              </button>
            </>
          )}
          {canCreate && (
            <>
              <button
                onClick={handleCreateMatch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Match
              </button>
              <button
                onClick={handleCreatePromo}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Promo
              </button>
            </>
          )}
        </div>
      </div>
      {show && (
        <div className="space-y-4">
          <p><strong>Date:</strong> {show.FormattedDate}</p>
          <p><strong>Address:</strong> {show.Address}</p>
          <p><strong>Brand:</strong> {show.Brand}</p>
          <p><strong>Commissioner Goal:</strong> {show.CommisionerGoal}</p>
          <p><strong>Pay Per View:</strong> {show.IsPayPerView ? 'Yes' : 'No'}</p>
          <MatchesComponent showId={show.Id} brand={show.Brand} onEdit={handleEditMatch} />
          <PromosComponent showId={show.Id} brand={show.Brand} />
        </div>
      )}
    </div>
  );
};

export default ShowDetailPage;
