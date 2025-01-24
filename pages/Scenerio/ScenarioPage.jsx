import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScenarios, deleteScenario } from '../../services/Scenerio/scenarioService';
import { getScenarioAssignments } from '../../services/ScenerioAssignment/scenarioAssignmentService';
import ScenarioCard from '../../components/Scenerio/ScenarioCard';
import { useAuth } from '../../context/AuthContext'; // AuthContext'i içe aktar

const ScenarioPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth(); // Kullanıcının oturum bilgilerini al

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const scenariosData = await getScenarios();
        console.log('Fetched Scenarios:', scenariosData); // Senaryoları logla
        const scenariosWithAssignments = await Promise.all(
          scenariosData.map(async (scenario) => {
            console.log('Processing scenario ID:', scenario.Id); // Her bir senaryoyu logla
            const assignments = await getScenarioAssignments(scenario.Id); // Doğru fonksiyon çağrısı
            console.log(`Assignments for Scenario ${scenario.Id}:`, assignments); // Atamaları logla
            return { ...scenario, assignments };
          })
        );
        setScenarios(scenariosWithAssignments);
      } catch (err) {
        setError('Failed to load scenarios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scenario?')) {
      try {
        await deleteScenario(id);
        setScenarios((prev) => prev.filter((scenario) => scenario.Id !== id));
        alert('Scenario deleted successfully!');
      } catch (err) {
        console.error('Failed to delete scenario:', err);
        alert('Failed to delete the scenario.');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  const userRole = auth?.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Scenarios</h1>
        {userRole === 'Brand Manager' && ( // Sadece Brand Manager görsün
          <button
            onClick={() => navigate('/scenario/create')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Create Scenario
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.Id}
            scenario={scenario}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ScenarioPage;
