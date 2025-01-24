import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { getMatchesByShowId, deleteMatch } from '../../services/Match/matchService';
import { getMatchParticipants } from '../../services/MatchParticipant/matchParticipantService';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getCoachById } from '../../services/Coach/coachService';
import { getWriterById } from '../../services/Writer/writerService';
import { useAuth } from '../../context/AuthContext'; // Auth context import edildi

const MatchesComponent = ({ showId, brand, onEdit }) => {
  const { auth } = useAuth(); 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const role = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userBrand = auth.user.Brand; 

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const matchesData = await getMatchesByShowId(showId);
        const matchesWithDetails = await Promise.all(
          matchesData.map(async (match) => {
            const participants = await getMatchParticipants(match.Id);
            const wrestlers = await Promise.all(
              participants
                .filter((p) => p.ParticipantType === 'Wrestler')
                .map(async (p) => ({
                  ...p,
                  wrestlerDetails: await getWrestlerById(p.WrestlerId),
                }))
            );
            const coachDetails = match.CoachId ? await getCoachById(match.CoachId) : null;
            const writerDetails = match.WriterId ? await getWriterById(match.WriterId) : null;

            return {
              ...match,
              participants: wrestlers,
              coachDetails,
              writerDetails,
            };
          })
        );
        setMatches(matchesWithDetails);
      } catch (err) {
        setError('Failed to load match details.');
        console.error('Error fetching match details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [showId]);

  const handleDelete = async (matchId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this match?');
    if (!confirmDelete) return;

    try {
      await deleteMatch(matchId);
      setMatches((prev) => prev.filter((match) => match.Id !== matchId));
      alert('Match deleted successfully!');
    } catch (error) {
      console.error('Failed to delete match:', error);
      alert('Failed to delete match. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading matches...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Matches</h2>
      {matches.length === 0 ? (
        <p className="text-white">No matches available for this show.</p>
      ) : (
        matches.map((match) => (
          <div
            key={match.Id}
            className="p-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-lg shadow-lg space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Match Details</h3>
                <ul className="space-y-2">
                  <li><strong>Type:</strong> {match.Type}</li>
                  <li><strong>Stipulation:</strong> {match.Stipulation}</li>
                  <li><strong>Title Match:</strong> {match.IsTitleMatch ? 'Yes' : 'No'}</li>
                  <li><strong>Match Order:</strong> {match.MatchOrder}</li>
                  <li><strong>Match Rating:</strong> {match.MatchRaiting}</li>
                </ul>
              </div>

              {(role === 'General Manager' || (role === 'Brand Manager' && brand === userBrand)) && (
                <button
                  onClick={() => onEdit(match)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold">Participants</h3>
              {match.participants.length === 0 ? (
                <p>No wrestlers available.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {match.participants.map((participant) => (
                    <div key={participant.Id} className="p-4 bg-gray-700 rounded-lg shadow">
                      <p><strong>Wrestler:</strong> {participant.wrestlerDetails.Nickname}</p>
                      <p><strong>Gender:</strong> {participant.wrestlerDetails.Gender}</p>
                      <p><strong>Fight Style:</strong> {participant.wrestlerDetails.FightStyle}</p>
                      <p><strong>Winner:</strong> {participant.IsWinner ? 'Yes' : 'No'}</p>
                      <p>
                        <strong>Alignment:</strong>{' '}
                        <span
                          className={
                            participant.wrestlerDetails.HeelOrFace === 'Heel'
                              ? 'text-red-500'
                              : 'text-blue-500'
                          }
                        >
                          {participant.wrestlerDetails.HeelOrFace}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold">Coach and Writer</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Coach:</strong>{' '}
                  {match.coachDetails
                    ? `${match.coachDetails.FullName} (Fight Style: ${match.coachDetails.FightStyle})`
                    : 'N/A'}
                </li>
                <li>
                  <strong>Writer:</strong> {match.writerDetails ? match.writerDetails.FullName : 'N/A'}
                </li>
              </ul>
            </div>

            {(role === 'General Manager' || (role === 'Brand Manager' && brand === userBrand)) && (
              <button
                onClick={() => handleDelete(match.Id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MatchesComponent;
