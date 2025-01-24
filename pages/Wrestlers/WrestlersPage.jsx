import React, { useState, useEffect } from 'react';
import { getWrestlers } from '../../services/Wrestler/wrestlerService';
import WrestlerCard from '../../components/Wrestler/WrestlerCard';
import { useAuth } from '../../context/AuthContext';

const WrestlersPage = () => {
  const { auth } = useAuth();
  const [wrestlers, setWrestlers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    heelOrFace: '',
    fightStyle: '',
    gender: '',
    sortBy: '',
    orderByDescending: true,
    pageNumber: 1,
    pageSize: 24,
    brand: auth.user.Brand, // Kullanıcının Brand bilgisi token'dan alınıyor
  });

  useEffect(() => {
    const fetchWrestlers = async () => {
      setLoading(true);
      try {
        const { wrestlers: fetchedWrestlers, total: fetchedTotal } = await getWrestlers(filters);
        setWrestlers(fetchedWrestlers);
        setTotal(fetchedTotal);
      } catch (err) {
        setError('Failed to load wrestlers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWrestlers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wrestlers</h1>

      {/* Filtreleme Alanı */}
      <div className="mb-6 p-4 border rounded bg-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search Wrestlers"
            className="p-2 border rounded text-black"
          />
          <select
            name="heelOrFace"
            value={filters.heelOrFace}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="">All Alignments</option>
            <option value="Heel">Heel</option>
            <option value="Face">Face</option>
          </select>
          <select
            name="fightStyle"
            value={filters.fightStyle}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="">All Fight Styles</option>
            <option value="Fighter">Fighter</option>
            <option value="High-Flyer">High-Flyer</option>
            <option value="Bruiser">Bruiser</option>
            <option value="Technical">Technical</option>
          </select>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="p-2 border rounded text-black"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Wrestler Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wrestlers.map((wrestler) => (
          <WrestlerCard key={wrestler.Id} wrestler={wrestler} />
        ))}
      </div>

      {/* Sayfalama */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setFilters((prev) => ({ ...prev, pageNumber: prev.pageNumber - 1 }))}
          disabled={filters.pageNumber === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {filters.pageNumber} of {Math.ceil(total / filters.pageSize)}
        </span>
        <button
          onClick={() => setFilters((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))}
          disabled={filters.pageNumber === Math.ceil(total / filters.pageSize)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WrestlersPage;
