import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createScenario } from '../../services/Scenerio/scenarioService';
import { createScenarioAssignment } from '../../services/ScenerioAssignment/scenarioAssignmentService';
import { useAuth } from '../../context/AuthContext';
import Step1ScenarioDetails from '../../components/Scenerio/Step1ScenarioDetails';
import Step2SelectWriter from '../../components/Scenerio/Step2SelectWriter';
import Step3SelectWrestlers from '../../components/Scenerio/Step3SelectWrestlers';
import Step4Review from '../../components/Scenerio/Step4Review';

const CreateScenario = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedWrestlers, setSelectedWrestlers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const scenario = await createScenario({ Title: title, Content: content });
      await Promise.all(
        selectedWrestlers.map((wrestler) =>
          createScenarioAssignment({
            ScenarioId: scenario.Id,
            WrestlerId: wrestler.Id,
            WriterId: selectedWriter.Id,
          })
        )
      );
      alert('Scenario created successfully!');
      navigate('/scenarios');
    } catch (error) {
      console.error('Failed to create scenario:', error);
      alert('Failed to create scenario.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1ScenarioDetails
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          nextStep={nextStep}
          navigate={navigate}
        />
      )}
      {step === 2 && (
        <Step2SelectWriter
          selectedWriter={selectedWriter}
          setSelectedWriter={setSelectedWriter}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3SelectWrestlers
          selectedWrestlers={selectedWrestlers}
          setSelectedWrestlers={setSelectedWrestlers}
          nextStep={nextStep}
          prevStep={prevStep}
          auth={auth}
        />
      )}
      {step === 4 && (
        <Step4Review
          title={title}
          content={content}
          selectedWriter={selectedWriter}
          selectedWrestlers={selectedWrestlers}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateScenario;
