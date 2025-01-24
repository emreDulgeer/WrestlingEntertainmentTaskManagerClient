import React, { useEffect, useState } from 'react';
import { getCoaches } from '../../services/Coach/coachService';
import { getWriters } from '../../services/Writer/writerService';

const Step2CoachWriter = ({ matchData, setMatchData, nextStep, prevStep }) => {
  const [coaches, setCoaches] = useState([]);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Koç ve Yazarları API'den çekmek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coachData, writerData] = await Promise.all([getCoaches(), getWriters()]);
        setCoaches(coachData);
        setWriters(writerData);
      } catch (err) {
        setError('Failed to fetch coach and writer data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Varsayılan Koç ve Yazar seçimi
  useEffect(() => {
    if (coaches.length > 0 && !matchData.coach) {
      const defaultCoach = coaches[0];
      setMatchData((prev) => ({
        ...prev,
        coach: defaultCoach,
        coachId: defaultCoach.Id,
      }));
    }

    if (writers.length > 0 && !matchData.writer) {
      const defaultWriter = writers[0];
      setMatchData((prev) => ({
        ...prev,
        writer: defaultWriter,
        writerId: defaultWriter.Id,
      }));
    }
  }, [coaches, writers, matchData, setMatchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedItem =
      name === 'coachId'
        ? coaches.find((coach) => coach.Id === parseInt(value))
        : writers.find((writer) => writer.Id === parseInt(value));

    setMatchData((prev) => ({
      ...prev,
      [name]: value,
      [name === 'coachId' ? 'coach' : 'writer']: selectedItem,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Coach Selection */}
      <div>
        <label className="block font-bold mb-2">Coach:</label>
        <select
          name="coachId"
          value={matchData.coachId || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select a Coach
          </option>
          {coaches.map((coach) => (
            <option key={coach.Id} value={coach.Id}>
              {coach.FullName} - {coach.FightStyle}
            </option>
          ))}
        </select>
      </div>

      {/* Writer Selection */}
      <div>
        <label className="block font-bold mb-2">Writer:</label>
        <select
          name="writerId"
          value={matchData.writerId || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
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
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2CoachWriter;
