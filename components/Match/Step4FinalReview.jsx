import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWrestlerById } from "../../services/Wrestler/wrestlerService";

const Step4FinalReview = ({ matchData, prevStep, submitMatch }) => {
  const navigate = useNavigate();
  const { id: showId } = useParams();
  const [participantsWithDetails, setParticipantsWithDetails] = useState([]);

  useEffect(() => {
    console.log("Match Data at Final Review:", matchData);

    const fetchParticipantsDetails = async () => {
      try {
        const participantDetails = await Promise.all(
          matchData.participants.map(async (participant) => {
            const wrestlerDetails = await getWrestlerById(participant.WrestlerId);
            return { ...participant, ...wrestlerDetails };
          })
        );
        setParticipantsWithDetails(participantDetails);
      } catch (error) {
        console.error("Error fetching wrestler details:", error);
      }
    };

    fetchParticipantsDetails();
  }, [matchData]);

  const handleBack = () => prevStep();

  const handleConfirm = async () => {
    try {
      await submitMatch();
      navigate(`/show/${showId}`);
    } catch (error) {
      console.error("Error during match creation:", error);
      alert("Failed to create match.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review and Confirm Match Details</h2>

      {/* Match Info */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Match Information</h3>
        <p><strong>Type:</strong> {matchData.Type || "Not selected"}</p>
        <p><strong>Stipulation:</strong> {matchData.Stipulation || "Not selected"}</p>
        <p><strong>Order:</strong> {matchData.MatchOrder || "Not selected"}</p>
        <p><strong>Title Match:</strong> {matchData.IsTitleMatch ? "Yes" : "No"}</p>
      </div>

      {/* Coach and Writer */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Coach and Writer</h3>
        <p><strong>Coach:</strong> {matchData.coach?.FullName || "Not selected"}</p>
        <p><strong>Writer:</strong> {matchData.writer?.FullName || "Not selected"}</p>
      </div>

      {/* Wrestlers */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Selected Wrestlers</h3>
        {participantsWithDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {participantsWithDetails.map((participant) => (
              <div
                key={participant.WrestlerId}
                className="p-4 bg-gray-700 text-white rounded-lg shadow-md flex flex-col items-center"
              >
                <h3 className="text-lg font-bold mb-2">{participant.Nickname || "Unknown"}</h3>
                <p>
                  <strong>Brand:</strong>{" "}
                  <span
                    className={
                      participant.Brand === "Raw" ? "text-red-500" : "text-blue-500"
                    }
                  >
                    {participant.Brand || "Unknown"}
                  </span>
                </p>
                <p><strong>Fight Style:</strong> {participant.FightStyle || "Unknown"}</p>
                <p><strong>Gender:</strong> {participant.Gender || "Unknown"}</p>
                <p>
                  <strong>Alignment:</strong>{" "}
                  <span
                    className={
                      participant.HeelOrFace === "Heel" ? "text-red-500" : "text-blue-500"
                    }
                  >
                    {participant.HeelOrFace || "Unknown"}
                  </span>
                </p>
                <p>
                  <strong>Winner:</strong>{" "}
                  <span
                    className={
                      participant.IsWinner ? "text-green-500" : "text-gray-500"
                    }
                  >
                    {participant.IsWinner ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No wrestlers selected.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm and Create Match
        </button>
      </div>
    </div>
  );
};

export default Step4FinalReview;
