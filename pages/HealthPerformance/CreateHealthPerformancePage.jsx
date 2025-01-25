import React, { useState } from "react";
import Step1CreateReport from "../../components/HealthPerformance/Step1CreateReport";
import Step2ReviewReport from "../../components/HealthPerformance/Step2ReviewReport";
import { createHealthPerformanceReport } from "../../services/HealthPerformance/healthPerformanceService";
import { useNavigate } from "react-router-dom";

const CreateHealthPerformancePage = () => {
  const [step, setStep] = useState(1);
  const [notes, setNotes] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const reportData = {
        WrestlerId: selectedWrestler.Id,
        PerformanceNotes: notes,
        HealthStatus: healthStatus,
        ReportDate: new Date().toISOString(),
      };

      await createHealthPerformanceReport(reportData);
      alert("Report created successfully!");
      navigate("/reports");
    } catch (error) {
      console.error("Failed to create report:", error);
      alert("Failed to create report.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1CreateReport
          notes={notes}
          setNotes={setNotes}
          healthStatus={healthStatus}
          setHealthStatus={setHealthStatus}
          selectedWrestler={selectedWrestler}
          setSelectedWrestler={setSelectedWrestler}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2ReviewReport
          notes={notes}
          healthStatus={healthStatus}
          selectedWrestler={selectedWrestler}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateHealthPerformancePage;
