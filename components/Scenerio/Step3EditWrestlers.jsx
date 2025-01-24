import React, { useEffect, useState } from 'react';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';

const Step3EditWrestlers = ({
  selectedWrestlers,
  setSelectedWrestlers,
  nextStep,
  prevStep,
  auth,
  originalAssignments,
}) => {
  const [wrestlers, setWrestlers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalWrestlers, setTotalWrestlers] = useState(0);

  useEffect(() => {
    const fetchWrestlers = async () => {
      try {
        const { wrestlers, total } = await getWrestlers({
          brand: auth.user.Brand, // Kullanıcı Brand'e göre filtreleme
          pageNumber,
          pageSize: 24,
        });

        setWrestlers(wrestlers);
        setTotalWrestlers(total);

        // Varsayılan olarak originalAssignments içindeki Wrestler'ları seçili yap
        const wrestlerIdsFromAssignments = originalAssignments.map((assignment) => assignment.WrestlerId);
        setSelectedWrestlers((prev) => [
          ...prev,
          ...wrestlers.filter((wrestler) => wrestlerIdsFromAssignments.includes(wrestler.Id)),
        ]);
      } catch (error) {
        console.error('Failed to fetch wrestlers:', error);
      }
    };

    fetchWrestlers();
  }, [pageNumber, auth.user.Brand, originalAssignments, setSelectedWrestlers]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 3: Edit Wrestlers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wrestlers.map((wrestler) => (
          <div
            key={wrestler.Id}
            onClick={() =>
              setSelectedWrestlers((prev) =>
                prev.some((w) => w.Id === wrestler.Id)
                  ? prev.filter((w) => w.Id !== wrestler.Id) // Seçimden çıkar
                  : [...prev, wrestler] // Seçime ekle
              )
            }
            className={`p-6 border-2 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-xl ${
              selectedWrestlers.some((w) => w.Id === wrestler.Id)
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-700 bg-gray-800'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-200">{wrestler.FullName}</h3>
            <p className="text-gray-400 text-sm italic">"{wrestler.Nickname}"</p>
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

      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
          Back
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, Math.ceil(totalWrestlers / 24)))
            }
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            disabled={pageNumber === Math.ceil(totalWrestlers / 24)}
          >
            Next
          </button>
        </div>
        <button
          onClick={nextStep}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-500"
          disabled={selectedWrestlers.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3EditWrestlers;
