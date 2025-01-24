import React, { useEffect, useState } from 'react';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';
import { getWriters } from '../../services/Writer/writerService';

const StepAssignPromoParticipants = ({ promoData, setPromoData, nextStep, prevStep }) => {
  const [wrestlers, setWrestlers] = useState([]);
  const [writers, setWriters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [wrestlerResponse, writerResponse] = await Promise.all([
          getWrestlers({ pageNumber: currentPage, pageSize }),
          getWriters(),
        ]);

        setWrestlers(wrestlerResponse.wrestlers);
        setTotalPages(Math.ceil(wrestlerResponse.total / pageSize));
        setWriters(writerResponse);
      } catch (err) {
        setError('Failed to fetch wrestlers or writers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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

  const handleNext = (e) => {
    e.preventDefault();
    if (promoData.wrestlerIds.length === 0) {
      alert('Please select at least one wrestler.');
      return;
    }
    if (!promoData.writerId) {
      alert('Please select a writer.');
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Assign Participants</h2>

      {/* Wrestlers Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Wrestlers:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wrestlers.map((wrestler) => {
            const isSelected = promoData.wrestlerIds.includes(wrestler.Id);
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
      </div>

      {/* Writer Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Select a Writer:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {writers.map((writer) => {
            const isSelected = promoData.writerId === writer.Id;
            return (
              <div
                key={writer.Id}
                onClick={() => selectWriter(writer.Id)}
                className={`p-4 rounded-lg shadow-lg cursor-pointer ${
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

      {/* Navigation Buttons */}
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

export default StepAssignPromoParticipants;
