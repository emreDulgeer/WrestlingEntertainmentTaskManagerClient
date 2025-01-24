import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoaches } from '../../services/Coach/coachService';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';
import { createTrainingRequest } from '../../services/TrainingRequest/trainingService';
import { useAuth } from '../../context/AuthContext';

const CreateTrainingRequest = () => {
  const [step, setStep] = useState(1);
  const [trainingDetails, setTrainingDetails] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [wrestlers, setWrestlers] = useState([]);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(1); // Wrestler pagination
  const [totalPages, setTotalPages] = useState(1);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Coachları yükle
  useEffect(() => {
    if (step === 2) {
      const fetchCoaches = async () => {
        try {
          const data = await getCoaches({ brand: auth.user.Brand });
          setCoaches(data);
        } catch (err) {
          setError('Failed to load coaches.');
        }
      };
      fetchCoaches();
    }
  }, [step, auth.user.Brand]);

  // Wrestler'ları yükle
  useEffect(() => {
    if (step === 3) {
      const fetchWrestlers = async () => {
        try {
          const { wrestlers, total } = await getWrestlers({
            brand: auth.user.Brand,
            pageNumber,
            pageSize: 24,
          });
          setWrestlers(wrestlers);
          setTotalPages(Math.ceil(total / 24));
        } catch (err) {
          setError('Failed to load wrestlers.');
        }
      };
      fetchWrestlers();
    }
  }, [step, auth.user.Brand, pageNumber]);

  const handleSubmit = async () => {
    const payload = {
      CoachId: selectedCoach.Id,
      WrestlerId: selectedWrestler.Id,
      Status: 'Ongoing',
      TrainingDetails: trainingDetails,
      RequestedAtRaw: new Date().toISOString(),
    };
    try {
      await createTrainingRequest(payload);
      alert('Training request created successfully!');
      navigate('/trainings');
    } catch (err) {
      setError('Failed to create training request.');
    }
  };

  const goToPreviousPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Step 1: Training Details</h1>
          <textarea
            value={trainingDetails}
            onChange={(e) => setTrainingDetails(e.target.value)}
            placeholder="Enter training details"
            className="w-full p-2 border rounded text-black"
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => navigate('/trainings')}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Step 2: Select Coach</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.map((coach) => (
              <div
                key={coach.Id}
                onClick={() => setSelectedCoach(coach)}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedCoach?.Id === coach.Id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <h3 className="text-xl font-bold">{coach.FullName}</h3>
                <p>Fight Style: {coach.FightStyle}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!selectedCoach}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Step 3: Select Wrestler</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wrestlers.map((wrestler) => (
              <div
                key={wrestler.Id}
                onClick={() => setSelectedWrestler(wrestler)}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedWrestler?.Id === wrestler.Id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <h3 className="text-xl font-bold">{wrestler.FullName}</h3>
                <p className="italic text-sm">"{wrestler.Nickname}"</p>
                <p>Fight Style: {wrestler.FightStyle}</p>
                <p>Gender: {wrestler.Gender}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={pageNumber === 1}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {pageNumber} of {totalPages}
            </p>
            <button
              onClick={goToNextPage}
              disabled={pageNumber === totalPages}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!selectedWrestler}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Step 4: Final Review</h1>
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="font-bold">Training Details</h3>
            <p>{trainingDetails}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="font-bold">Coach</h3>
            <p>{selectedCoach.FullName}</p>
            <p>Fight Style: {selectedCoach.FightStyle}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded mb-4">
            <h3 className="font-bold">Wrestler</h3>
            <p>{selectedWrestler.FullName}</p>
            <p className="italic text-sm">"{selectedWrestler.Nickname}"</p>
            <p>Fight Style: {selectedWrestler.FightStyle}</p>
            <p>Gender: {selectedWrestler.Gender}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTrainingRequest;
