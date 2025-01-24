import React, { useState } from 'react';
import StepUserInfo from './StepUserInfo';
import StepRoleInfo from './StepRoleInfo';
import StepConfirmation from './StepConfirmation';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/User/userService';
import { createWrestler } from '../../services/Wrestler/wrestlerService';
import { createCoach } from '../../services/Coach/coachService';
import { createWriter } from '../../services/Writer/writerService';
import { createBrandManager } from '../../services/BrandManager/brandManagerService';

const CreateUserPage = () => {
  const [step, setStep] = useState(1); // Adım kontrolü
  const [userData, setUserData] = useState({
    FullName: '',
    Nickname: '',
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    Role: '',
  });
  const [roleData, setRoleData] = useState({});
  const navigate = useNavigate();

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const handleCancel = () => {
    navigate('/users'); // İptal edilirse Users sayfasına yönlendirme
  };

  const handleUserSubmit = (data) => {
    setUserData(data);
    handleNextStep();
  };

  const handleRoleSubmit = (data) => {
    setRoleData(data);
    handleNextStep();
  };

  const handleFinalSubmit = async () => {
    try {
      // User bilgilerini gönderiyoruz
      const userResponse = await createUser(userData);

      // UserId'yi roleData'ya ekliyoruz
      const roleSpecificData = { ...roleData, UserId: userResponse.Id };

      // Role bilgilerini gönderiyoruz
      switch (userData.Role) {
        case 'Wrestler':
          await createWrestler(roleSpecificData);
          break;
        case 'Coach':
          await createCoach(roleSpecificData);
          break;
        case 'Writer':
          await createWriter(roleSpecificData);
          break;
        case 'Brand Manager':
          await createBrandManager(roleSpecificData);
          break;
        default:
          throw new Error('Invalid role selected');
      }

      alert('User created successfully!');
      navigate('/users'); // İşlem tamamlanınca Users sayfasına yönlendirme
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  return (
    <div className="p-6">
      {/* İlerleme Göstergesi */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Step {step} of 3: {step === 1 ? 'User Information' : step === 2 ? 'Role Information' : 'Confirmation'}
        </h2>
        <div className="flex space-x-2 mt-2">
          <div
            className={`h-2 flex-grow rounded ${
              step >= 1 ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`h-2 flex-grow rounded ${
              step >= 2 ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`h-2 flex-grow rounded ${
              step === 3 ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        </div>
      </div>

      {step === 1 && (
        <StepUserInfo
          initialData={userData}
          onSubmit={handleUserSubmit}
          onCancel={handleCancel}
        />
      )}
      {step === 2 && (
        <StepRoleInfo
          role={userData.Role}
          initialData={roleData}
          onSubmit={handleRoleSubmit}
          onBack={handlePrevStep}
          onCancel={handleCancel}
        />
      )}
      {step === 3 && (
        <StepConfirmation
          userData={userData}
          roleData={roleData}
          onSubmit={handleFinalSubmit}
          onBack={handlePrevStep}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CreateUserPage;
