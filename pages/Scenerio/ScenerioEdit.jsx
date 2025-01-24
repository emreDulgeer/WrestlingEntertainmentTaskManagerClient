import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScenarioById, updateScenario } from '../../services/Scenerio/scenarioService';
import {
  getScenarioAssignments,
  deleteScenarioAssignment,
  createScenarioAssignment,
} from '../../services/ScenerioAssignment/scenarioAssignmentService';
import Step1EditDetails from '../../components/Scenerio/Step1EditDetails';
import Step2EditWriter from '../../components/Scenerio/Step2EditWriter';
import Step3EditWrestlers from '../../components/Scenerio/Step3EditWrestlers';
import Step4EditReview from '../../components/Scenerio/Step4EditReview';

const ScenerioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Scenario ve Assignment Verileri
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalScenario, setOriginalScenario] = useState({});
  const [originalAssignments, setOriginalAssignments] = useState([]);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedWrestlers, setSelectedWrestlers] = useState([]);

  // Veriyi Getir
  useEffect(() => {
    const fetchScenarioData = async () => {
      try {
        const scenario = await getScenarioById(id);
        const assignments = await getScenarioAssignments(id);

        setTitle(scenario.Title);
        setContent(scenario.Content);
        setOriginalScenario(scenario);
        setOriginalAssignments(assignments);

        if (assignments.length > 0) {
          // Writer ID
          const writer = assignments[0].Writer;
          setSelectedWriter(writer);

          // Wrestler IDs
          const wrestlers = assignments.map((a) => a.Wrestler);
          setSelectedWrestlers(wrestlers);
        }
      } catch (error) {
        console.error('Failed to fetch scenario data:', error);
      }
    };

    fetchScenarioData();
  }, [id]);

  // Adımların Kontrolü
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit İşlemi
  const handleSubmit = async () => {
    try {
      // Scenario Güncelle
      await updateScenario(id, { Title: title, Content: content });

      // Eski Assignment'ları Sil
      await Promise.all(originalAssignments.map((a) => deleteScenarioAssignment(a.Id)));

      // Yeni Assignment'ları Oluştur
      await Promise.all(
        selectedWrestlers.map((wrestler) =>
          createScenarioAssignment({
            ScenarioId: id,
            WrestlerId: wrestler.Id,
            WriterId: selectedWriter.Id,
          })
        )
      );

      alert('Scenario updated successfully!');
      navigate('/scenarios');
    } catch (error) {
      console.error('Failed to update scenario:', error);
      alert('Failed to update scenario.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1EditDetails
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2EditWriter
          selectedWriter={selectedWriter}
          setSelectedWriter={setSelectedWriter}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3EditWrestlers
          selectedWrestlers={selectedWrestlers}
          setSelectedWrestlers={setSelectedWrestlers}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Step4EditReview
          title={title}
          content={content}
          selectedWriter={selectedWriter}
          selectedWrestlers={selectedWrestlers}
          originalScenario={originalScenario}
          originalAssignments={originalAssignments}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ScenerioEdit;
