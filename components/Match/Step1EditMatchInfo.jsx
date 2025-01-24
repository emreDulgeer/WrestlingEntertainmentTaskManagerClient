import React from 'react';

const Step1EditMatchInfo = ({ matchData, setMatchData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setMatchData((prev) => ({
      ...prev,
      MatchRating: rating, 
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      
      <div>
        <label className="block font-bold mb-2">Type:</label>
        <select
          name="Type"
          value={matchData.Type}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Match Type
          </option>
          <option value="1vs1">1vs1</option>
          <option value="Triple Threat">Triple Threat</option>
          <option value="Fatal 4-Way">Fatal 4-Way</option>
        </select>
      </div>

      
      <div>
        <label className="block font-bold mb-2">Stipulation:</label>
        <select
          name="Stipulation"
          value={matchData.Stipulation}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Stipulation
          </option>
          <option value="Normal">Normal</option>
          <option value="No DQ">No DQ</option>
          <option value="TLC">TLC</option>
        </select>
      </div>

      
      <div>
        <label className="block font-bold mb-2">Title Match:</label>
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

      
      <div>
        <label className="block font-bold mb-2">Match Order:</label>
        <select
          name="MatchOrder"
          value={matchData.MatchOrder}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Match Order
          </option>
          <option value="Opener">Opener</option>
          <option value="Mid Card">Mid Card</option>
          <option value="Main Event">Main Event</option>
        </select>
      </div>

      
      <div>
      <label className="block font-bold mb-2">Match Rating:</label>
      <div className="flex space-x-2">
        {[...Array(10)].map((_, index) => {
          const rating = index + 1;
          return (
            <svg
              key={rating}
              onClick={() =>
                setMatchData((prev) => ({ ...prev, MatchRating: rating }))
              }
              xmlns="http://www.w3.org/2000/svg"
              fill={rating <= matchData.MatchRating ? 'gold' : 'gray'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          );
        })}
      </div>
      </div>

      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export default Step1EditMatchInfo;
