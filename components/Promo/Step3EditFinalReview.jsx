import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getWriterById } from '../../services/Writer/writerService';

const Step3EditFinalReview = ({ promoData, originalPromoData, prevStep, submitPromo }) => {
  const [updatedWrestlers, setUpdatedWrestlers] = useState([]);
  const [originalWrestlers, setOriginalWrestlers] = useState([]);
  const [updatedWriter, setUpdatedWriter] = useState(null);
  const [originalWriter, setOriginalWriter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: showId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        // Fetch updated wrestlers
        const updatedWrestlerPromises = promoData.wrestlerIds.map((id) =>
          getWrestlerById(id)
        );
        const fetchedUpdatedWrestlers = await Promise.all(updatedWrestlerPromises);
        setUpdatedWrestlers(fetchedUpdatedWrestlers);

        // Fetch original wrestlers
        const originalWrestlerPromises = originalPromoData.wrestlerIds.map((id) =>
          getWrestlerById(id)
        );
        const fetchedOriginalWrestlers = await Promise.all(originalWrestlerPromises);
        setOriginalWrestlers(fetchedOriginalWrestlers);

        // Fetch updated writer
        if (promoData.writerId) {
          const fetchedUpdatedWriter = await getWriterById(promoData.writerId);
          setUpdatedWriter(fetchedUpdatedWriter);
        }

        // Fetch original writer
        if (originalPromoData.writerId) {
          const fetchedOriginalWriter = await getWriterById(originalPromoData.writerId);
          setOriginalWriter(fetchedOriginalWriter);
        }
      } catch (err) {
        console.error('Error fetching wrestler or writer data:', err);
        setError('Failed to fetch wrestler or writer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [promoData, originalPromoData]);

  const handleBack = () => prevStep();
  const handleConfirm = async () => {
    try {
      await submitPromo();
    } catch (error) {
      console.error('Error submitting promo:', error);
      alert('Failed to update promo.');
    }
  };

  const renderWrestlerChanges = (originalWrestlers, updatedWrestlers) => {
    const originalIds = originalWrestlers.map((w) => w.Id);

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Updated wrestlers */}
        {updatedWrestlers.map((wrestler) => {
          const isNew = !originalIds.includes(wrestler.Id);
          return (
            <div key={wrestler.Id} className="p-4 bg-gray-700 rounded-lg shadow">
              <h3 className="text-lg font-bold">{wrestler.Nickname}</h3>
              <p>
                <strong>Alignment:</strong>{' '}
                <span
                  className={
                    wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-500'
                  }
                >
                  {wrestler.HeelOrFace}
                </span>
              </p>
              <p><strong>Brand:</strong> {wrestler.Brand}</p>
              <p><strong>Gender:</strong> {wrestler.Gender}</p>
              {isNew && <span className="text-yellow-500">→ New</span>}
            </div>
          );
        })}

        {/* Removed wrestlers */}
        {originalWrestlers.map((wrestler) => {
          if (!updatedWrestlers.find((w) => w.Id === wrestler.Id)) {
            return (
              <div key={wrestler.Id} className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow">
                <h3 className="text-lg font-bold">{wrestler.Nickname}</h3>
                <p>
                  <strong>Alignment:</strong>{' '}
                  <span
                    className={
                      wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-500'
                    }
                  >
                    {wrestler.HeelOrFace}
                  </span>
                </p>
                <p><strong>Brand:</strong> {wrestler.Brand}</p>
                <p><strong>Gender:</strong> {wrestler.Gender}</p>
                <span className="text-red-500">→ Removed</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderWriterChange = (originalWriter, updatedWriter) => {
    const isChanged = originalWriter?.Id !== updatedWriter?.Id;
    return (
      <div className="p-4 bg-gray-700 rounded-lg shadow">
        <h3 className="text-lg font-bold">Writer</h3>
        <p>
          <strong>Old Writer:</strong> {originalWriter?.FullName || 'None'}
        </p>
        {isChanged && (
          <>
            <span className="text-yellow-500">→</span>
            <p>
              <strong>New Writer:</strong> {updatedWriter?.FullName || 'None'}
            </p>
          </>
        )}
      </div>
    );
  };

  if (loading) return <p>Loading final review...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review and Confirm Promo Changes</h2>

      {/* Promo Info */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Promo Information</h3>
        <p><strong>Type:</strong> {promoData.Type}</p>
        <p><strong>Order In Show:</strong> {promoData.OrderInShow}</p>
        <p><strong>Promo Rating:</strong> {promoData.PromoRating}</p>
      </div>

      {/* Wrestlers */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Wrestlers</h3>
        {renderWrestlerChanges(originalWrestlers, updatedWrestlers)}
      </div>

      {/* Writer */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Writer</h3>
        {renderWriterChange(originalWriter, updatedWriter)}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Confirm and Update Promo
        </button>
      </div>
    </div>
  );
};

export default Step3EditFinalReview;
