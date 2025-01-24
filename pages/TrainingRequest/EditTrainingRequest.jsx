import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoaches, getCoachById } from '../../services/Coach/coachService';
import { getTrainingRequestById, updateTrainingRequest } from '../../services/TrainingRequest/trainingService';
import { useAuth } from '../../context/AuthContext';

const EditTrainingRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [step, setStep] = useState(1);
  const [trainingRequest, setTrainingRequest] = useState(null);
  const [trainingDetails, setTrainingDetails] = useState('');
  const [status, setStatus] = useState('Started');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [oldCoach, setOldCoach] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState('');

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Fetch training request details
  useEffect(() => {
    const fetchTrainingRequest = async () => {
      try {
        const data = await getTrainingRequestById(id);
        setTrainingRequest(data);
        setTrainingDetails(data.TrainingDetails);
        setStatus(data.Status);

        // Fetch old coach details
        const coachData = await getCoachById(data.CoachId);
        setOldCoach(coachData);
      } catch (err) {
        setError('Failed to load training request.');
      }
    };

    fetchTrainingRequest();
  }, [id]);

  // Fetch coaches with filtering
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

  const handleSubmit = async () => {
    const payload = {
      CoachId: selectedCoach ? selectedCoach.Id : trainingRequest.CoachId,
      WrestlerId: trainingRequest.WrestlerId,
      TrainingDetails: trainingDetails,
      Status: status,
    };

    try {
      await updateTrainingRequest(id, payload);
      alert('Training request updated successfully!');
      navigate('/trainings');
    } catch (err) {
      setError('Failed to update training request.');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!trainingRequest || !oldCoach) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <div>
          <h1 className="text-3xl font-bold mb-4">Step 1: Edit Training Details</h1>
          <textarea
            value={trainingDetails}
            onChange={(e) => setTrainingDetails(e.target.value)}
            placeholder="Edit training details"
            className="w-full p-2 border rounded text-black"
          />
          <div className="mt-4">
            <label className="block text-sm font-bold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded text-black"
            >
              <option value="Started">Started</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
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
          <h1 className="text-3xl font-bold mb-4">Step 2: Select New Coach</h1>
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
          <h1 className="text-3xl font-bold mb-4">Step 3: Final Review</h1>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="font-bold text-green-500">Old Training Details</h3>
              <p>{trainingRequest.TrainingDetails}</p>
              <h3 className="font-bold text-blue-500 mt-4">New Training Details</h3>
              <p>{trainingDetails}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="font-bold">Coach</h3>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-700 rounded">
                  <h3 className="text-green-500">{oldCoach.FullName}</h3>
                  <p>{oldCoach.FightStyle}</p>
                </div>
                <div className="text-2xl font-bold text-white">{'->'}</div>
                <div className="p-4 bg-gray-700 rounded">
                  <h3 className="text-blue-500">
                    {selectedCoach ? selectedCoach.FullName : oldCoach.FullName}
                  </h3>
                  <p>{selectedCoach ? selectedCoach.FightStyle : oldCoach.FightStyle}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="font-bold">Status</h3>
              <p className="text-green-500 inline">{trainingRequest.Status}</p>
              <span className="text-blue-500 ml-4">{status}</span>
            </div>
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

export default EditTrainingRequest;
