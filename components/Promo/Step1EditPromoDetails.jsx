import React, { useEffect } from 'react';

const Step1EditPromoDetails = ({ promoData, setPromoData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // `promoData`'yı konsola yazdırarak kontrol edelim
  useEffect(() => {
    console.log('Step1 Promo Data:', promoData);
  }, [promoData]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
      {/* Type */}
      <div>
        <label className="block font-bold mb-2">Type:</label>
        <select
          name="Type"
          value={promoData.Type || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select Promo Type</option>
          <option value="Interview">Interview</option>
          <option value="Highlight">Highlight</option>
          <option value="Callout">Callout</option>
          <option value="Single Promo">Single Promo</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Backstage Segment">Backstage Segment</option>
          <option value="Charity">Charity</option>
        </select>
      </div>

      {/* Order In Show */}
      <div>
        <label className="block font-bold mb-2">Order In Show:</label>
        <select
          name="OrderInShow"
          value={promoData.OrderInShow || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select Order In Show</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Promo Rating */}
      <div>
        <label className="block font-bold mb-2">Promo Rating:</label>
        <select
          name="PromoRating"
          value={promoData.PromoRating || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select Promo Rating</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      {/* Next Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Next
      </button>
    </form>
  );
};

export default Step1EditPromoDetails;
