import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getWriterById } from '../../services/Writer/writerService';
import { useAuth } from '../../context/AuthContext';

const ScenarioCard = ({ scenario, onDelete }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [writerName, setWriterName] = useState('Loading...');
  const [wrestlerNicknames, setWrestlerNicknames] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  useEffect(() => {
    const fetchWriterAndWrestlers = async () => {
      try {
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

  const isBrandManager =
    auth?.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Brand Manager';

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6">
      {/* Scenario Header */}
      <div className="border-b border-gray-600 pb-4">
        <h2 className="text-2xl font-semibold text-white">{scenario.Title}</h2>
        <p className="text-sm text-gray-300">{scenario.Content}</p>
      </div>

      {/* Scenario Details */}
      <div className="space-y-2">
        <p className="text-sm text-gray-200">
          <strong>Approved:</strong>{' '}
          <span className={scenario.IsApproved ? 'text-green-400' : 'text-red-400'}>
            {scenario.IsApproved ? 'Yes' : 'No'}
          </span>
        </p>
        <p className="text-sm text-gray-200">
          <strong>Created At:</strong> {scenario.FormattedCreatedAt}
        </p>
      </div>

      {/* Assignments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Assignments</h3>
        {loadingAssignments ? (
          <p className="text-sm text-gray-400">Loading assignments...</p>
        ) : (
          <div>
            <p className="text-sm text-gray-200">
              <strong>Writer:</strong> {writerName}
            </p>
            <ul className="mt-2 space-y-1">
              {wrestlerNicknames.map((nickname, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-900 bg-gray-300 px-3 py-2 rounded shadow-md"
                >
                  <strong>Wrestler:</strong> {nickname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isBrandManager && (
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => navigate(`/scenario/edit/${scenario.Id}`)}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(scenario.Id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;
