import React, { useEffect, useState } from 'react';
import { getWriters } from '../../services/Writer/writerService';

const Step2EditWriter = ({ selectedWriter, setSelectedWriter, originalAssignments, nextStep, prevStep }) => {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const writersData = await getWriters();
        setWriters(writersData);

        // Mevcut Writer'ı otomatik olarak seç
        if (originalAssignments.length > 0) {
          const currentWriter = writersData.find((writer) => writer.Id === originalAssignments[0].WriterId);
          if (currentWriter) {
            setSelectedWriter(currentWriter);
          }
        }
      } catch (error) {
        console.error('Failed to fetch writers:', error);
      }
    };
    fetchWriters();
  }, [originalAssignments, setSelectedWriter]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Writer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {writers.map((writer) => (
          <div
            key={writer.Id}
            onClick={() => setSelectedWriter(writer)}
            className={`p-4 border rounded shadow-md cursor-pointer transform ${
              selectedWriter?.Id === writer.Id ? 'bg-blue-500' : 'bg-gray-800'
            }`}
          >
            <h3 className="text-lg font-bold">{writer.FullName}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          disabled={!selectedWriter}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2EditWriter;
