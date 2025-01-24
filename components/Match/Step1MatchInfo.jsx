import React, { useEffect } from 'react';

const Step1MatchInfo = ({ matchData, setMatchData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  // Varsayılan değerleri ayarla
  useEffect(() => {
    if (!matchData.Type) {
      setMatchData((prev) => ({
        ...prev,
        Type: '1vs1', // Varsayılan maç türü
      }));
    }
    if (!matchData.Stipulation) {
      setMatchData((prev) => ({
        ...prev,
        Stipulation: 'Normal', // Varsayılan stipülasyon
      }));
    }
    if (!matchData.MatchOrder) {
      setMatchData((prev) => ({
        ...prev,
        MatchOrder: 'Opener', // Varsayılan maç sıralaması
      }));
    }
  }, [matchData, setMatchData]);

  useEffect(() => {
    console.log('Updated Match Data:', matchData);
  }, [matchData]);

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Type Selection */}
      <div>
        <label className="block font-bold mb-2 ">Type:</label>
        <select
          name="Type"
          value={matchData.Type}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="1vs1">1vs1</option>
          <option value="Triple Threat">Triple Threat</option>
          <option value="Fatal 4-Way">Fatal 4-Way</option>
        </select>
      </div>

      {/* Stipulation Selection */}
      <div>
        <label className="block font-bold mb-2 ">Stipulation:</label>
        <select
          name="Stipulation"
          value={matchData.Stipulation}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="Normal">Normal</option>
          <option value="No Dq">No Dq</option>
          <option value="TLC">TLC</option>
          <option value="Steel Cage">Steel Cage</option>
        </select>
      </div>

      {/* Title Match Checkbox */}
      <div>
        <label className="block font-bold mb-2 ">Title Match:</label>
        <input
          type="checkbox"
          name="IsTitleMatch"
          checked={matchData.IsTitleMatch}
          onChange={(e) =>
            setMatchData((prev) => ({
              ...prev,
              IsTitleMatch: e.target.checked,
            }))
          }
          className="text-black"
        />
      </div>

      {/* Match Order Selection */}
      <div>
        <label className="block font-bold mb-2 ">Match Order:</label>
        <select
          name="MatchOrder"
          value={matchData.MatchOrder}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="Opener">Opener</option>
          <option value="Mid Card">Mid Card</option>
          <option value="Main Event">Main Event</option>
        </select>
      </div>

      {/* Next Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </form>
  );
};

export default Step1MatchInfo;
