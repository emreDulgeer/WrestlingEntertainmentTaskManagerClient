import React, { useState, useEffect } from "react";
import { getWrestlers } from "../../services/Wrestler/wrestlerService";
import { useAuth } from "../../context/AuthContext";

const Step1CreateReport = ({
  notes,
  setNotes,
  healthStatus,
  setHealthStatus,
  selectedWrestler,
  setSelectedWrestler,
  nextStep,
}) => {
  const { auth } = useAuth();
  const [wrestlers, setWrestlers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalWrestlers, setTotalWrestlers] = useState(0);
  const pageSize = 24;

  useEffect(() => {
    const fetchWrestlers = async () => {
      try {
        const { wrestlers, total } = await getWrestlers({
          brand: auth?.user?.Brand, // Kullanıcının token'ındaki Brand bilgisi
          pageNumber,
          pageSize,
        });
        setWrestlers(wrestlers);
        setTotalWrestlers(total);
      } catch (error) {
        console.error("Failed to fetch wrestlers:", error);
      }
    };

    fetchWrestlers();
  }, [auth?.user?.Brand, pageNumber]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Step 1: Create Report</h1>

      {/* Input Alanları */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold">Performance Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 rounded border bg-black text-white"
          placeholder="Enter performance notes"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-bold">Health Status</label>
        <input
          type="text"
          value={healthStatus}
          onChange={(e) => setHealthStatus(e.target.value)}
          className="w-full p-3 rounded border bg-black text-white"
          placeholder="Enter health status"
        />
      </div>

      {/* Wrestler Kartları */}
      <h2 className="text-2xl font-bold mb-4">Select Wrestler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wrestlers.map((wrestler) => (
          <div
            key={wrestler.Id}
            onClick={() => setSelectedWrestler(wrestler)}
            className={`p-4 border rounded shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
              selectedWrestler?.Id === wrestler.Id
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            <h3 className="text-lg font-bold">{wrestler.FullName}</h3>
            <p className="text-sm">Ringname: {wrestler.Nickname}</p>
            <p className="text-sm">Gender: {wrestler.Gender}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, Math.ceil(totalWrestlers / pageSize)))
          }
          disabled={pageNumber === Math.ceil(totalWrestlers / pageSize)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Next Butonu */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!notes || !healthStatus || !selectedWrestler}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1CreateReport;
