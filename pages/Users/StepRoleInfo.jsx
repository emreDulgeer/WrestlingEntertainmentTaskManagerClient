import React from 'react';
import WrestlerForm from '../../components/Roles/WrestlerForm';
import CoachForm from '../../components/Roles/CoachForm';
import WriterForm from '../../components/Roles/WriterForm';
import BrandManagerForm from '../../components/Roles/BrandManagerForm';

const roleForms = {
  Wrestler: WrestlerForm,
  Coach: CoachForm,
  Writer: WriterForm,
  'Brand Manager': BrandManagerForm,
};

const StepRoleInfo = ({ role, initialData, onSubmit, onBack, onCancel }) => {
  const RoleSpecificForm = roleForms[role];

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className='my-4'>
      <h2 className="text-2xl font-bold mb-4">Role Information</h2>
      {RoleSpecificForm ? (
        <RoleSpecificForm initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p className="text-red-500">Invalid Role Selected</p>
      )}
      <button onClick={onBack} className="bg-yellow-500 text-white px-4 py-2 my-4 mr-4 rounded">
        Back
      </button>
      <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 my-4 rounded">
        Cancel
      </button>
    </div>
  );
};

export default StepRoleInfo;
