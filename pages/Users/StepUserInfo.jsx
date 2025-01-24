import React, { useState } from 'react';

const StepUserInfo = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Veriyi bir üst bileşene gönderiyoruz
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <input
        type="text"
        name="FullName"
        placeholder="Full Name"
        value={formData.FullName}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        name="NickName"
        placeholder="Nick Name"
        value={formData.NickName}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        name="UserName"
        placeholder="Username"
        value={formData.UserName}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="email"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="text"
        name="PhoneNumber"
        placeholder="Phone Number"
        value={formData.PhoneNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="password"
        name="Password"
        placeholder="Password"
        value={formData.Password}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      />
      <select
        name="Role"
        value={formData.Role}
        onChange={handleChange}
        className="w-full p-2 border rounded text-black"
        required
      >
        <option value="" disabled>Select Role</option>
        <option value="Wrestler">Wrestler</option>
        <option value="Coach">Coach</option>
        <option value="Writer">Writer</option>
        <option value="Brand Manager">Brand Manager</option>
      </select>
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
        <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StepUserInfo;
