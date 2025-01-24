import React from 'react';

const Step1ScenarioDetails = ({ title, content, setTitle, setContent, nextStep, navigate }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Step 1: Scenario Details</h1>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
      />
      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />
      <div className="flex justify-between mt-4">
        <button onClick={() => navigate('/scenarios')} className="bg-gray-600 px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 px-4 py-2 rounded"
          disabled={!title || !content}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1ScenarioDetails;
