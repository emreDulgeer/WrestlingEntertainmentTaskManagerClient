import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPromosByShowId, deletePromo } from '../../services/Promo/PromoService';
import { getPromoAssignmentsByPromoId } from '../../services/PromoAssignment/PromoAssignmentService';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';
import { getWriterById } from '../../services/Writer/writerService';
import { useAuth } from '../../context/AuthContext'; // Auth için context kullanımı

const PromosComponent = ({ showId, brand }) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth(); // Kullanıcının rolünü kontrol etmek için auth bilgisi
  const role = auth.user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const userBrand = auth.user.Brand; // Token'dan kullanıcı Brand bilgisi

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const promosData = await getPromosByShowId(showId);

        const promosWithDetails = await Promise.all(
          promosData.map(async (promo) => {
            const assignments = await getPromoAssignmentsByPromoId(promo.Id);

            const wrestlerIds = [...new Set(assignments.map((a) => a.WrestlerId).filter(Boolean))];
            const writerIds = [...new Set(assignments.map((a) => a.WriterId).filter(Boolean))];

            const wrestlers = await Promise.all(wrestlerIds.map((id) => getWrestlerById(id)));
            const writers = await Promise.all(writerIds.map((id) => getWriterById(id)));

            return {
              ...promo,
              wrestlers,
              writers,
            };
          })
        );

        setPromos(promosWithDetails);
      } catch (err) {
        setError('Failed to fetch promos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, [showId]);

  const handleDelete = async (promoId) => {
    if (!window.confirm('Are you sure you want to delete this promo?')) return;

    try {
      await deletePromo(promoId);
      setPromos((prev) => prev.filter((promo) => promo.Id !== promoId));
      alert('Promo deleted successfully!');
    } catch (err) {
      console.error('Failed to delete promo:', err);
      alert('Failed to delete promo. Please try again.');
    }
  };

  if (loading) return <p>Loading promos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {promos.map((promo) => (
        <div key={promo.Id} className="bg-gray-800 text-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Promo Details</h3>
          <p><strong>Type:</strong> {promo.Type}</p>
          <p><strong>Order In Show:</strong> {promo.OrderInShow}</p>
          <p><strong>Promo Rating:</strong> {promo.PromoRating}</p>

          {/* Wrestlers Cards */}
          <h4 className="mt-4 text-lg font-semibold">Wrestlers</h4>
          {promo.wrestlers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {promo.wrestlers.map((wrestler) => (
                <div key={wrestler.Id} className="p-4 bg-gray-700 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{wrestler.Nickname}</h3>
                  <p><strong>Gender:</strong> {wrestler.Gender}</p>
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
                </div>
              ))}
            </div>
          ) : (
            <p>No wrestlers assigned.</p>
          )}

          {/* Writers */}
          <h4 className="mt-4 text-lg font-semibold">Writers</h4>
          {promo.writers.length > 0 ? (
            <ul className="list-disc pl-6">
              {promo.writers.map((writer) => (
                <li key={writer.Id}>{writer.FullName}</li>
              ))}
            </ul>
          ) : (
            <p>No writers assigned.</p>
          )}

          {/* Buttons */}
          {(role === 'General Manager' || (role === 'Brand Manager' && brand === userBrand)) && (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => navigate(`/promo/edit/${promo.Id}`)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(promo.Id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PromosComponent;
