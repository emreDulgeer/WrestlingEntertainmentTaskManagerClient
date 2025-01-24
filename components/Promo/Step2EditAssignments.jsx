import React, { useEffect, useState } from 'react';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';
import { getWriters } from '../../services/Writer/writerService';

const Step2EditAssignments = ({ promoData, setPromoData, nextStep, prevStep }) => {
  const [wrestlers, setWrestlers] = useState([]);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const [fetchedWrestlers, fetchedWriters] = await Promise.all([
          getWrestlers(),
          getWriters(),
        ]);
        setWrestlers(fetchedWrestlers.wrestlers || []);
        setWriters(fetchedWriters || []);
      } catch (err) {
        setError('Failed to load participants.');
        console.error('Error fetching participants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const toggleWrestlerSelection = (wrestlerId) => {
    const isSelected = promoData.wrestlerIds.includes(wrestlerId);
    setPromoData((prev) => ({
      ...prev,
      wrestlerIds: isSelected
        ? prev.wrestlerIds.filter((id) => id !== wrestlerId)
        : [...prev.wrestlerIds, wrestlerId],
    }));
  };

  const selectWriter = (writerId) => {
    setPromoData((prev) => ({
      ...prev,
      writerId,
    }));
  };

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Edit Assignments</h2>

      {/* Wrestlers */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Wrestlers:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wrestlers.map((wrestler) => {
            const isSelected = promoData.wrestlerIds.includes(wrestler.Id);
            return (
              <div
                key={wrestler.Id}
                onClick={() => toggleWrestlerSelection(wrestler.Id)}
                className={`p-4 rounded-lg shadow cursor-pointer ${
                  isSelected ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-200'
                } hover:opacity-90`}
              >
                <h3 className="text-lg font-bold">{wrestler.Nickname}</h3>
                <p><strong>Fight Style:</strong> {wrestler.FightStyle}</p>
                <p><strong>Gender:</strong> {wrestler.Gender}</p>
                <p>
                  <strong>Alignment:</strong>{' '}
                  <span
                    className={
                      wrestler.HeelOrFace === 'Heel'
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }
                  >
                    {wrestler.HeelOrFace}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Writers */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Select a Writer:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {writers.map((writer) => {
            const isSelected = promoData.writerId === writer.Id;
            return (
              <div
                key={writer.Id}
                onClick={() => selectWriter(writer.Id)}
                className={`p-4 rounded-lg shadow cursor-pointer ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200'
                } hover:opacity-90`}
              >
                <h3 className="text-lg font-bold">{writer.FullName}</h3>
                <p><strong>Experience:</strong> {writer.Experience} years</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2EditAssignments;
