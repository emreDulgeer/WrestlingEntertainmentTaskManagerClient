import React from 'react';

const Step4EditReview = ({
  title,
  content,
  selectedWriter,
  selectedWrestlers,
  originalScenario,
  originalAssignments,
  prevStep,
  handleSubmit,
}) => {
  const getUpdatedText = (original, updated) => {
    if (original === updated) return <span className="text-gray-300">{original}</span>;
    return (
      <span>
        <span className="text-red-500">{original}</span> →{' '}
        <span className="text-green-500">{updated}</span>
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 4: Review</h1>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-bold text-gray-200">Title:</h3>
        {getUpdatedText(originalScenario.Title, title)}
      </div>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-bold text-gray-200">Content:</h3>
        {getUpdatedText(originalScenario.Content, content)}
      </div>
      <div className="bg-gray-800 p-4 rounded mb-4">
        <h3 className="text-lg font-bold text-gray-200">Writer:</h3>
        {getUpdatedText(
          originalAssignments[0]?.Writer?.FullName || 'None',
          selectedWriter?.FullName || 'None'
        )}
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold text-gray-200">Wrestlers:</h3>
        <ul>
          {originalAssignments.map((assignment, index) => (
            <li key={index} className="text-red-500">
              {assignment.Wrestler?.FullName || 'Unknown'}
            </li>
          ))}
          {selectedWrestlers.map((wrestler, index) => (
            <li key={index} className="text-green-500">
              {wrestler.FullName || 'Unknown'}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4EditReview;
