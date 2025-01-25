import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getHealthPerformanceReports,deleteHealthPerformanceReport } from "../../services/HealthPerformance/healthPerformanceService";
import HealthPerformanceCard from "../../components/HealthPerformance/HealthPerformanceCard";
import { getWrestlerById } from "../../services/Wrestler/wrestlerService";
import { getCoachById } from "../../services/Coach/coachService";
import { useNavigate } from "react-router-dom";

const HealthPerformancePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isCoach =
    auth?.user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "Coach";

  useEffect(() => {
    const fetchReports = async () => {
      try {
        let wrestlerId = null;

        if (
          auth?.user?.[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "Wrestler"
        ) {
          wrestlerId = auth.user.WrestlerId;
        }

        const reportsData = await getHealthPerformanceReports({ wrestlerId });

        const enrichedReports = await Promise.all(
          reportsData.map(async (report) => {
            let wrestlerName = "Unknown";
            let coachName = "Unknown";

            if (report.WrestlerId) {
              const wrestler = await getWrestlerById(report.WrestlerId);
              wrestlerName = wrestler?.FullName || "Unknown";
            }

            if (report.CoachId) {
              const coach = await getCoachById(report.CoachId);
              coachName = coach?.FullName || "Unknown";
            }

            const isEditableByCoach =
              isCoach && parseInt(auth?.user?.CoachId) === parseInt(report.CoachId);

            return {
              ...report,
              WrestlerName: wrestlerName,
              CoachName: coachName,
              isEditableByCoach,
            };
          })
        );

        setReports(enrichedReports);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError("Failed to load health performance reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [auth, isCoach]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await deleteHealthPerformanceReport(id);
        setReports((prevReports) => prevReports.filter((report) => report.Id !== id));
        alert("Report deleted successfully!");
      } catch (error) {
        console.error("Failed to delete report:", error);
        alert("Failed to delete the report.");
      }
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {isCoach && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => navigate("/reports/create")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Create Report
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Health Performance Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <HealthPerformanceCard
            key={report.Id}
            report={report}
            isEditableByCoach={report.isEditableByCoach}
            // onEdit={(id) => console.log("Edit report with ID:", id)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthPerformancePage;
