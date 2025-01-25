import React from 'react';

const Step4Review = ({ title, content, selectedWriter, selectedWrestlers, prevStep, handleSubmit }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Step 4: Review</h1>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3>Title: {title}</h3>
        <p>Content: {content}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3>Writer: {selectedWriter?.FullName}</h3>
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h3>Wrestlers:</h3>
        <ul>
          {selectedWrestlers.map((wrestler) => (
            <li key={wrestler.Id}>{wrestler.FullName}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
