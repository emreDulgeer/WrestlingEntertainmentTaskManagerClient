import React, { useEffect, useState } from 'react';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';

const Step3EditParticipants = ({ matchData, setMatchData, nextStep, prevStep }) => {
  const [wrestlers, setWrestlers] = useState([]); // Tüm güreşçi listesi
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageSize = 24; // Her sayfada gösterilecek güreşçi sayısı

  useEffect(() => {
    const fetchWrestlers = async () => {
      setLoading(true);
      setError('');

      try {
        const { wrestlers: fetchedWrestlers, total } = await getWrestlers({
          pageNumber: currentPage,
          pageSize,
        });

        setWrestlers(fetchedWrestlers);
        setTotalPages(Math.ceil(total / pageSize)); // Toplam sayfa sayısını hesapla
      } catch (err) {
        setError('Failed to fetch wrestlers.');
        console.error('Error fetching wrestlers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWrestlers();
  }, [currentPage]); // currentPage değiştiğinde yeniden veri yükle

  const toggleWrestlerSelection = (wrestlerId) => {
    const isSelected = matchData.participants.some(
      (p) => p.WrestlerId === wrestlerId
    );

    setMatchData((prev) => ({
      ...prev,
      participants: isSelected
        ? prev.participants.filter((p) => p.WrestlerId !== wrestlerId)
        : [...prev.participants, { WrestlerId: wrestlerId }],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (matchData.participants.length === 0) {
      alert('Please select at least one participant.');
      return;
    }
    nextStep();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  console.log('matchData:', matchData.participants);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Edit Participants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wrestlers.map((wrestler) => {
          const isSelected = matchData.participants.some(
            (p) => p.WrestlerId === wrestler.Id
          );
          return (
            <div
              key={wrestler.Id}
              onClick={() => toggleWrestlerSelection(wrestler.Id)}
              className={`p-4 rounded-lg shadow-lg cursor-pointer ${
                isSelected ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-200'
              } hover:opacity-90`}
            >
              <h3 className="text-lg font-bold">{wrestler.Nickname}</h3>
              <p><strong>Fight Style:</strong> {wrestler.FightStyle}</p>
              <p><strong>Gender:</strong> {wrestler.Gender}</p>
              <p>
                <strong>Alignment:</strong>{' '}
                <span className={wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-500'}>
                  {wrestler.HeelOrFace}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
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
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3EditParticipants;
