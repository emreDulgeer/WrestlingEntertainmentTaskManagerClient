import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShow } from '../../services/Show/showService';

const CreateShowPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Date: '',
    Address: '',
    Brand: '',
    CommisionerGoal: '',
    IsPayPerView: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating Show with Data:', formData);
      await createShow(formData); // Show oluşturma API çağrısı
      alert('Show created successfully!');
      navigate('/shows'); // ShowPage'e yönlendirme
    } catch (err) {
      console.error('Failed to create show:', err);
      alert('Failed to create the show.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create Show</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <select
          name="Brand"
          value={formData.Brand}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select Brand</option>
          <option value="Raw">Raw</option>
          <option value="Smackdown">Smackdown</option>
        </select>
        <textarea
          name="CommisionerGoal"
          placeholder="Commissioner Goal"
          value={formData.CommisionerGoal}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="IsPayPerView"
            checked={formData.IsPayPerView}
            onChange={handleChange}
          />
          <span>Is Pay Per View</span>
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate('/shows')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShowPage;
