import React from 'react';

const Step1PromoInfo = ({ promoData, setPromoData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Promo Type Selection */}
      <div>
        <label className="block font-bold mb-2">Type:</label>
        <select
          name="Type"
          value={promoData.Type}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Promo Type
          </option>
          <option value="Interview">Interview</option>
          <option value="Highlight">Highlight</option>
          <option value="Callout">Callout</option>
          <option value="Single Promo">Single Promo</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Backstage Segment">Backstage Segment</option>
          <option value="Charity">Charity</option>
        </select>
      </div>

      {/* Order In Show Selection */}
      <div>
        <label className="block font-bold mb-2">Order In Show:</label>
        <select
          name="OrderInShow"
          value={promoData.OrderInShow}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>
            Select Order In Show
          </option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export default Step1PromoInfo;
