import React from "react";

const Step2ReviewReport = ({ notes, healthStatus, selectedWrestler, prevStep, handleSubmit }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 2: Review Report</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Report Details</h2>
        <p className="text-lg text-gray-300">
          <strong>Performance Notes:</strong> {notes}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Health Status:</strong> {healthStatus}
        </p>
        <p className="text-lg text-gray-300">
          <strong>Wrestler:</strong> {selectedWrestler?.FullName} ({selectedWrestler?.Nickname})
        </p>
      </div>

      {/* Butonlar */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step2ReviewReport;
