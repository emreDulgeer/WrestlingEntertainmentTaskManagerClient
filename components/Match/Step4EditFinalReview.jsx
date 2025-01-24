import React, { useEffect, useState } from 'react';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';

const Step4EditFinalReview = ({ matchData, prevStep, submitMatch, originalMatchData }) => {
  const [participantsWithDetails, setParticipantsWithDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantsDetails = async () => {
      try {
        const participants = await Promise.all(
          matchData.participants.map(async (participant) => {
            const wrestlerDetails = await getWrestlerById(participant.WrestlerId);
            return { ...participant, wrestlerDetails };
          })
        );
        setParticipantsWithDetails(participants);
      } catch (err) {
        console.error('Failed to fetch participant details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantsDetails();
  }, [matchData.participants]);

  const handleBack = () => prevStep();
  const handleConfirm = () => submitMatch();

  const renderChange = (field, label, isNested = false) => {
    const original = isNested
      ? originalMatchData[field]?.FullName
      : originalMatchData[field];
    const updated = isNested ? matchData[field]?.FullName : matchData[field];
  
    if (original === updated) {
      return (
        <li>
          <strong>{label}:</strong> <span className="text-green-400">{updated || 'Not Selected'}</span>
        </li>
      );
    } else {
      return (
        <li>
          <strong>{label}:</strong>{' '}
          <span className="text-red-500">{original || 'Not Selected'}</span>{' '}
          <span className="text-yellow-500">→</span>{' '}
          <span className="text-green-400">{updated || 'Not Selected'}</span>
        </li>
      );
    }
  };
  

  const renderParticipantChange = (participant, originalParticipant) => {
    const isNewParticipant = !originalParticipant; // Eğer originalParticipant yoksa bu yeni bir katılımcıdır.
    const isChanged =
      originalParticipant &&
      (participant.WrestlerId !== originalParticipant.WrestlerId ||
        participant.IsWinner !== originalParticipant.IsWinner);
  
    return (
      <div
        key={participant.WrestlerId}
        className={`p-4 rounded-lg shadow ${
          isNewParticipant
            ? 'bg-green-700 border-l-4 border-green-500' // Yeni katılımcılar için yeşil
            : isChanged
            ? 'bg-gray-700 border-l-4 border-yellow-400' // Değişiklik için sarı
            : 'bg-gray-700'
        }`}
      >
        <p>
          <strong>Wrestler:</strong>{' '}
          {isNewParticipant ? (
            <span className="text-green-500">{participant.wrestlerDetails?.Nickname || 'Unknown'}</span>
          ) : isChanged ? (
            <>
              <span className="text-red-500">
                {originalParticipant?.wrestlerDetails?.Nickname || 'Unknown'}
              </span>{' '}
              <span className="text-yellow-500">→</span>{' '}
              <span className="text-green-400">{participant.wrestlerDetails?.Nickname || 'Unknown'}</span>
            </>
          ) : (
            <span className="text-green-400">{participant.wrestlerDetails?.Nickname || 'Unknown'}</span>
          )}
        </p>
        <p>
          <strong>Winner:</strong>{' '}
          {isNewParticipant ? (
            <span className="text-green-500">{participant.IsWinner ? 'Yes' : 'No'}</span>
          ) : isChanged ? (
            <>
              <span className="text-red-500">{originalParticipant?.IsWinner ? 'Yes' : 'No'}</span>{' '}
              <span className="text-yellow-500">→</span>{' '}
              <span className="text-green-500">{participant.IsWinner ? 'Yes' : 'No'}</span>
            </>
          ) : (
            <span className={participant.IsWinner ? 'text-green-500' : 'text-red-500'}>
              {participant.IsWinner ? 'Yes' : 'No'}
            </span>
          )}
        </p>
      </div>
    );
  };
  
  

  if (loading) {
    return <p>Loading participant details...</p>;
  }
  console.log("final page original match data",originalMatchData);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review and Confirm Match Changes</h2>

      {/* Match Info */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
  <h3 className="text-lg font-semibold mb-2">Match Information</h3>
  <ul className="space-y-2">
    {renderChange('Type', 'Type')}
    {renderChange('Stipulation', 'Stipulation')}
    {renderChange('MatchOrder', 'Order')}
    {renderChange('IsTitleMatch', 'Title Match')}
  </ul>
</div>

<div className="p-4 bg-gray-800 text-white rounded shadow-lg">
  <h3 className="text-lg font-semibold mb-2">Coach and Writer</h3>
  <ul className="space-y-2">
    {renderChange('coach', 'Coach', true)}
    {renderChange('writer', 'Writer', true)}
  </ul>
</div>

<div className="p-4 bg-gray-800 text-white rounded shadow-lg">
  <h3 className="text-lg font-semibold mb-2">Participants</h3>
  {participantsWithDetails.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {participantsWithDetails.map((participant) => {
        const originalParticipant = originalMatchData.participants.find(
          (p) => p.WrestlerId === participant.WrestlerId
        );
        return renderParticipantChange(participant, originalParticipant);
      })}
    </div>
  ) : (
    <p>No participants selected.</p>
  )}
</div>


      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm and Save Changes
        </button>
      </div>
    </div>
  );
};

export default Step4EditFinalReview;
