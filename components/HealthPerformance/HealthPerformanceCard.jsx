import React from "react";

const HealthPerformanceCard = ({ report, isEditableByCoach, onEdit, onDelete }) => {
    console.log("Health Performance Card CoachId",report.CoachId,"Health Performance Card isEditableByCoach", isEditableByCoach);
  return (
    <div
      className={`p-4 rounded-lg shadow-md space-y-4 ${
        isEditableByCoach ? "bg-green-700" : "bg-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold">{report.WrestlerName}</h2>
      <p>
        <strong>Coach:</strong> {report.CoachName}
      </p>
      <p>
        <strong>Performance Notes:</strong> {report.PerformanceNotes}
      </p>
      <p>
        <strong>Health Status:</strong> {report.HealthStatus}
      </p>
      <p>
        <strong>Report Date:</strong> {report.ReportDate}
      </p>
      {isEditableByCoach && (
        <div className="flex justify-end space-x-4">
          {/* <button
            onClick={() => onEdit(report.Id)}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button> */}
          <button
            onClick={() => onDelete(report.Id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthPerformanceCard;
