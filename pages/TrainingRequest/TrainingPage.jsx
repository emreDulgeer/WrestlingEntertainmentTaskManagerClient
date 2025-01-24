import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrainingRequests, deleteTrainingRequest } from '../../services/TrainingRequest/trainingService';
import { getCoachById } from '../../services/Coach/coachService';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { useAuth } from '../../context/AuthContext';

const TrainingPage = () => {
  const [trainingRequests, setTrainingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useAuth();
  const navigate = useNavigate();

  const role = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userId =
    role === 'Brand Manager'
      ? auth.user.BrandManagerId
      : role === 'Coach'
      ? auth.user.CoachId
      : auth.user.WrestlerId;

  useEffect(() => {
    const fetchTrainingRequests = async () => {
      try {
        const params =
          role === 'Brand Manager'
            ? { brandManagerId: userId }
            : role === 'Coach'
            ? { coachId: userId }
            : { wrestlerId: userId };

        const data = await getTrainingRequests(params);

        const detailedRequests = await Promise.all(
          data.map(async (request) => {
            const coach = await getCoachById(request.CoachId);
            const wrestler = await getWrestlerById(request.WrestlerId);

            return {
              ...request,
              coachFullName: coach.FullName,
              wrestlerFullName: wrestler.FullName,
            };
          })
        );

        setTrainingRequests(detailedRequests);
      } catch (err) {
        setError('Failed to load training requests.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingRequests();
  }, [role, userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this training request?');
    if (!confirmDelete) return;

    try {
      await deleteTrainingRequest(id);
      setTrainingRequests((prev) => prev.filter((request) => request.Id !== id));
      alert('Training request deleted successfully!');
    } catch (error) {
      console.error('Failed to delete training request:', error);
      alert('Failed to delete training request. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/training/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/training/create');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Training Requests</h1>
        {role === 'Brand Manager' && (
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Create Training Request
          </button>
        )}
      </div>
      {trainingRequests.length === 0 ? (
        <p>No training requests found.</p>
      ) : (
        <div className="space-y-4">
          {trainingRequests.map((request) => (
            <div
              key={request.Id}
              className="p-4 bg-gray-800 rounded-lg shadow-lg space-y-2 relative"
            >
              <p>
                <strong>Training Details:</strong> {request.TrainingDetails}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    request.Status === 'Ongoing'
                      ? 'text-yellow-500'
                      : request.Status === 'Finished'
                      ? 'text-green-500'
                      : 'text-gray-500'
                  }
                >
                  {request.Status}
                </span>
              </p>
              <p>
                <strong>Coach:</strong> {request.coachFullName}
              </p>
              <p>
                <strong>Wrestler:</strong> {request.wrestlerFullName}
              </p>
              <p>
                <strong>Requested At:</strong> {request.RequestedAtFormatted}
              </p>
              <p>
                <strong>Resolved At:</strong>{' '}
                {request.ResolvedAtFormatted || 'Not Resolved Yet'}
              </p>

              {/* Edit & Delete Buttons (Only for Brand Managers) */}
              {role === 'Brand Manager' && (
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEdit(request.Id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(request.Id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingPage;
