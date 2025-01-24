import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getWriterById } from '../../services/Writer/writerService';
import { useParams } from 'react-router-dom';
const Step3FinalReview = ({ promoData, prevStep, submitPromo }) => {
  const [wrestlers, setWrestlers] = useState([]);
  const [writer, setWriter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigate kancasını ekliyoruz
  const { id: showId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        // Wrestler verilerini çek
        const wrestlerPromises = promoData.wrestlerIds.map((id) => getWrestlerById(id));
        const fetchedWrestlers = await Promise.all(wrestlerPromises);
        setWrestlers(fetchedWrestlers);

        // Writer verisini çek
        if (promoData.writerId) {
          const fetchedWriter = await getWriterById(promoData.writerId);
          setWriter(fetchedWriter);
        }
      } catch (err) {
        console.error('Error fetching wrestler or writer data:', err);
        setError('Failed to fetch wrestler or writer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [promoData]);

  const handleBack = () => prevStep();
  const handleConfirm = async () => {
    try {
      await submitPromo();
      navigate(`/show/${showId}`); // İşlem başarılıysa navigate yap
    } catch (error) {
      console.error('Error submitting promo:', error);
      alert('Failed to create promo.');
    }
  };

  if (loading) return <p>Loading final review...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Review and Confirm Promo Details</h2>

      {/* Promo Info */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Promo Information</h3>
        <p><strong>Type:</strong> {promoData.Type || 'Not selected'}</p>
        <p><strong>Order In Show:</strong> {promoData.OrderInShow || 'Not selected'}</p>
      </div>

      {/* Wrestlers */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Selected Wrestlers</h3>
        {wrestlers.length > 0 ? (
          <ul className="list-disc pl-6">
            {wrestlers.map((wrestler) => (
              <li key={wrestler.Id}>
                <strong>{wrestler.Nickname}</strong> - {wrestler.Gender} -{' '}
                <span className={wrestler.HeelOrFace === 'Heel' ? 'text-red-500' : 'text-blue-500'}>
                  {wrestler.HeelOrFace}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No wrestlers selected.</p>
        )}
      </div>

      {/* Writer */}
      <div className="p-4 bg-gray-800 text-white rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Selected Writer</h3>
        {writer ? (
          <p>
            <strong>{writer.FullName}</strong>
          </p>
        ) : (
          <p>No writer selected.</p>
        )}
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
          Confirm and Create Promo
        </button>
      </div>
    </div>
  );
};

export default Step3FinalReview;
