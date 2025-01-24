import React, { useEffect, useState } from 'react';
import { getCoaches } from '../../services/Coach/coachService';
import { getWriters } from '../../services/Writer/writerService';

const Step2EditCoachWriter = ({ matchData, setMatchData, nextStep, prevStep }) => {
  const [coaches, setCoaches] = useState([]);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coachData, writerData] = await Promise.all([getCoaches(), getWriters()]);
        setCoaches(coachData);
        setWriters(writerData);

        // Varsayılan coach ve writer'ın doldurulması
        if (matchData.CoachId && coachData.length > 0) {
          const defaultCoach = coachData.find((coach) => coach.Id === matchData.CoachId);
          if (defaultCoach) {
            setMatchData((prev) => ({ ...prev, coach: defaultCoach }));
          }
        }

        if (matchData.WriterId && writerData.length > 0) {
          const defaultWriter = writerData.find((writer) => writer.Id === matchData.WriterId);
          if (defaultWriter) {
            setMatchData((prev) => ({ ...prev, writer: defaultWriter }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch coaches or writers:', err);
      }
    };

    fetchData();
  }, [matchData.CoachId, matchData.WriterId, setMatchData]);

  const handleCoachChange = (e) => {
    const selectedCoach = coaches.find((coach) => coach.Id === parseInt(e.target.value));
    setMatchData((prev) => ({
      ...prev,
      CoachId: selectedCoach?.Id || null,
      coach: selectedCoach || null,
    }));
  };

  const handleWriterChange = (e) => {
    const selectedWriter = writers.find((writer) => writer.Id === parseInt(e.target.value));
    setMatchData((prev) => ({
      ...prev,
      WriterId: selectedWriter?.Id || null,
      writer: selectedWriter || null,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Edit Coach and Writer</h2>

      {/* Coach Selection */}
      <div>
        <label className="block font-bold mb-2">Select Coach:</label>
        <select
          value={matchData.CoachId || ''} // Mevcut CoachId'yi seçili tutmak için
          onChange={handleCoachChange}
          className="w-full p-2 border rounded text-black"
        >
          <option value="" disabled>
            Select a Coach
          </option>
          {coaches.map((coach) => (
            <option key={coach.Id} value={coach.Id}>
              {coach.FullName}
            </option>
          ))}
        </select>
      </div>

      {/* Writer Selection */}
      <div>
        <label className="block font-bold mb-2">Select Writer:</label>
        <select
          value={matchData.WriterId || ''} // Mevcut WriterId'yi seçili tutmak için
          onChange={handleWriterChange}
          className="w-full p-2 border rounded text-black"
        >
          <option value="" disabled>
            Select a Writer
          </option>
          {writers.map((writer) => (
            <option key={writer.Id} value={writer.Id}>
              {writer.FullName}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2EditCoachWriter;
