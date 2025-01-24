import React from 'react';

const Step4Review = ({ title, content, selectedWriter, selectedWrestlers, prevStep, handleSubmit }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Step 4: Review</h1>

      {/* Scenario Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Scenario Details</h2>
        <p>
          <strong>Title:</strong> {title}
        </p>
        <p>
          <strong>Content:</strong> {content}
        </p>
      </div>

      {/* Writer Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Writer</h2>
        <p>
          <strong>Name:</strong> {selectedWriter?.FullName}
        </p>
      </div>

      {/* Wrestlers Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Selected Wrestlers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedWrestlers.map((wrestler) => (
            <div
              key={wrestler.Id}
              className="p-4 border-2 rounded-lg shadow-lg bg-gray-900 transform transition-transform duration-200 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white">{wrestler.FullName}</h3>
              <p className="text-gray-400 italic">"{wrestler.Nickname}"</p>
              <p className="text-gray-300">Gender: {wrestler.Gender}</p>
              <p className="text-gray-300">Brand: {wrestler.Brand}</p>
              <p
                className={`font-bold ${
                  wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-400'
                }`}
              >
                Alignment: {wrestler.HeelOrFace === 'Heel' ? 'Heel' : 'Face'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700">
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4Review;
