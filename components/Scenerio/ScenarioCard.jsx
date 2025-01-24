import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getWriterById } from '../../services/Writer/writerService';
import { useAuth } from '../../context/AuthContext';

const ScenarioCard = ({ scenario, onDelete }) => {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Kullanıcının rolü için AuthContext
  const [writerName, setWriterName] = useState('Loading...');
  const [wrestlerNicknames, setWrestlerNicknames] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  useEffect(() => {
    const fetchWriterAndWrestlers = async () => {
      try {
        // Eğer assignments varsa, writer ve wrestler bilgilerini getir
        if (scenario.assignments.length > 0) {
          const writerId = scenario.assignments[0]?.WriterId;
          if (writerId) {
            const writer = await getWriterById(writerId);
            setWriterName(writer.FullName || 'Unknown');
          } else {
            setWriterName('Unknown');
          }

          const wrestlerPromises = scenario.assignments.map(async (assignment) => {
            if (assignment.WrestlerId) {
              const wrestler = await getWrestlerById(assignment.WrestlerId);
              return wrestler.Nickname || 'Unknown';
            }
            return 'Unknown';
          });

          const wrestlerNicknamesResult = await Promise.all(wrestlerPromises);
          setWrestlerNicknames(wrestlerNicknamesResult);
        }
      } catch (error) {
        console.error('Failed to fetch writer or wrestler data:', error);
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchWriterAndWrestlers();
  }, [scenario.assignments]);

  // Kullanıcı rolü kontrolü
  const isBrandManager =
    auth?.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Brand Manager';

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md space-y-4 hover:shadow-lg transition-shadow duration-300">
      {/* Scenario Information */}
      <div>
        <h2 className="text-xl font-bold">{scenario.Title}</h2>
        <p className="text-gray-400">{scenario.Content}</p>
        <p>
          <strong>Approved:</strong> {scenario.IsApproved ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Created At:</strong> {scenario.FormattedCreatedAt}
        </p>
      </div>

      {/* Assignments */}
      <div>
        <h3 className="text-lg font-bold">Assignments</h3>
        {loadingAssignments ? (
          <p className="text-gray-400">Loading assignments...</p>
        ) : (
          <>
            <p>
              <strong>Writer:</strong> {writerName}
            </p>
            <ul className="space-y-2">
              {wrestlerNicknames.map((nickname, index) => (
                <li key={index}>
                  <p>
                    <strong>Wrestler:</strong> {nickname}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Actions */}
      {isBrandManager && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate(`/scenario/edit/${scenario.Id}`)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(scenario.Id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;
