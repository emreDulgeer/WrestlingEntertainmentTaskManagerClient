import React from 'react';

const Step1EditDetails = ({ title, setTitle, content, setContent, nextStep }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Scenario Details</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
        className="w-full p-2 border rounded text-black mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter Content"
        className="w-full p-2 border rounded text-black"
      />
      <div className="flex justify-end mt-6">
        <button
          onClick={nextStep}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-500"
          disabled={!title || !content}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1EditDetails;
