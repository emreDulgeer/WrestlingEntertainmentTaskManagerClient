import React, { useState } from 'react';

const BrandManagerForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="Brand"
        value={formData.Brand || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      >
        <option value="" disabled>Select Brand</option>
        <option value="Raw">Raw</option>
        <option value="Smackdown">Smackdown</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default BrandManagerForm;
