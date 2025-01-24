import React, { useState } from 'react';

const WrestlerForm = ({ initialData, onSubmit }) => {
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
      <select
        name="Gender"
        value={formData.Gender || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        name="FightStyle"
        value={formData.FightStyle || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      >
        <option value="" disabled>Select Fight Style</option>
        <option value="Bruiser">Bruiser</option>
        <option value="Fighter">Fighter</option>
        <option value="Giant">Giant</option>
        <option value="Cruiser">Cruiser</option>
        <option value="Specialist">Specialist</option>
      </select>
      <input
        type="text"
        name="Hometown"
        placeholder="Hometown"
        value={formData.Hometown || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        name="Nationality"
        placeholder="Nationality"
        value={formData.Nationality || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="number"
        name="Height"
        placeholder="Height (in cm)"
        value={formData.Height || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="number"
        name="Weight"
        placeholder="Weight (in kg)"
        value={formData.Weight || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <select
        name="HeelOrFace"
        value={formData.HeelOrFace || ''}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      >
        <option value="" disabled>Select Alignment</option>
        <option value="Heel">Heel</option>
        <option value="Face">Face</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default WrestlerForm;
