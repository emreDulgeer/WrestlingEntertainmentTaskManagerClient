import React from 'react';

const WriterForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Writer için ek bilgiler yok, sadece onaylanır
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-lg text-black">No additional information required for Writers.</p>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default WriterForm;
