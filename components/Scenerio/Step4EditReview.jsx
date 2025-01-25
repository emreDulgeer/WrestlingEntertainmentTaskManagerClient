import React, { useEffect, useState } from 'react';
import { getWriterById } from '../../services/Writer/writerService';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';

const Step4EditReview = ({
  title,
  content,
  selectedWriter,
  selectedWrestlers,
  originalAssignments,
  prevStep,
  handleSubmit,
}) => {
  const [originalWriterName, setOriginalWriterName] = useState('Loading...');
  const [originalWrestlers, setOriginalWrestlers] = useState([]);

  useEffect(() => {
    const fetchOriginalWriterAndWrestlers = async () => {
      try {
        // Original Writer bilgilerini çek
        const originalWriterId = originalAssignments.length > 0 ? originalAssignments[0].WriterId : null;
        if (originalWriterId) {
          const writer = await getWriterById(originalWriterId);
          setOriginalWriterName(writer.FullName || 'Unknown');
        } else {
          setOriginalWriterName('None');
        }

        // Original Wrestler bilgilerini çek
        const wrestlerPromises = originalAssignments.map(async (assignment) => {
          if (assignment.WrestlerId) {
            const wrestler = await getWrestlerById(assignment.WrestlerId);
            return { id: assignment.WrestlerId, name: wrestler.Nickname || 'Unknown' };
          }
          return { id: null, name: 'Unknown' };
        });

        const wrestlerResults = await Promise.all(wrestlerPromises);
        setOriginalWrestlers(wrestlerResults);
      } catch (error) {
        console.error('Failed to fetch original writer or wrestlers:', error);
      }
    };

    fetchOriginalWriterAndWrestlers();
  }, [originalAssignments]);

  // Değişiklik kontrolü
  const hasChanges = (newValue, oldValue) => newValue !== oldValue && oldValue !== undefined;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 4: Review Changes</h1>

      {/* Title & Content Review */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-bold text-gray-200 mb-2">Scenario Details</h3>
        <p>
          <strong>Title:</strong>{' '}
          {hasChanges(title, originalAssignments[0]?.ScenarioTitle) ? (
            <span>
              <span className="text-green-400">{originalAssignments[0]?.ScenarioTitle || 'None'}</span>{' '}
              <span className="text-gray-400">→</span>{' '}
              <span className="text-blue-400">{title}</span>
            </span>
          ) : (
            <span>{title}</span>
          )}
        </p>
        <p>
          <strong>Content:</strong>{' '}
          {hasChanges(content, originalAssignments[0]?.ScenarioContent) ? (
            <span>
              <span className="text-green-400">{originalAssignments[0]?.ScenarioContent || 'None'}</span>{' '}
              <span className="text-gray-400">→</span>{' '}
              <span className="text-blue-400">{content}</span>
            </span>
          ) : (
            <span>{content}</span>
          )}
        </p>
      </div>

      {/* Writer Review */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-bold text-gray-200 mb-2">Writer</h3>
        {hasChanges(selectedWriter?.Id, originalAssignments[0]?.WriterId) ? (
          <p>
            <span className="text-green-400">{originalWriterName}</span>{' '}
            <span className="text-gray-400">→</span>{' '}
            <span className="text-blue-400">{selectedWriter?.FullName}</span>
          </p>
        ) : (
          <p>{selectedWriter?.FullName || 'No changes'}</p>
        )}
      </div>

      {/* Wrestler Review */}
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold text-gray-200 mb-2">Wrestlers</h3>
        <ul>
          {originalWrestlers.map((originalWrestler) => {
            const isSelected = selectedWrestlers.some(
              (wrestler) => wrestler.Id === originalWrestler.id
            );

            return (
              <li key={originalWrestler.id} className="mb-2">
                {isSelected ? (
                  <p>
                    <span className="text-green-400">{originalWrestler.name}</span>{' '}
                    <span className="text-gray-400">→</span>{' '}
                    <span className="text-blue-400">
                      {
                        selectedWrestlers.find((wrestler) => wrestler.Id === originalWrestler.id)
                          ?.Nickname
                      }
                    </span>
                  </p>
                ) : (
                  <p className="text-red-400">Removed: {originalWrestler.name}</p>
                )}
              </li>
            );
          })}
        </ul>
        {selectedWrestlers
          .filter(
            (wrestler) =>
              !originalWrestlers.some((originalWrestler) => originalWrestler.id === wrestler.Id)
          )
          .map((newWrestler) => (
            <p key={newWrestler.Id} className="text-blue-400">
              Added: {newWrestler.Nickname}
            </p>
          ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4EditReview;
