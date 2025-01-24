import React, { useEffect, useState } from 'react';
import { getWriters } from '../../services/Writer/writerService';

const Step2SelectWriter = ({ selectedWriter, setSelectedWriter, nextStep, prevStep }) => {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersData = await getWriters();
        setWriters(writersData);
      } catch (error) {
        console.error('Failed to fetch writers:', error);
      }
    };
    fetchWriters();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 2: Select Writer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {writers.map((writer) => (
          <div
            key={writer.Id}
            onClick={() => setSelectedWriter(writer)}
            className={`p-6 border-2 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-xl ${
              selectedWriter?.Id === writer.Id
                ? 'border-blue-500 bg-blue-700 text-white'
                : 'border-gray-700 bg-gray-800 text-gray-300'
            }`}
          >
            <h3 className="text-xl font-semibold">{writer.FullName}</h3>
            <p className="text-sm italic">Click to select</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-500"
          disabled={!selectedWriter}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2SelectWriter;
