import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWrestlerById, updateWrestler } from '../../services/Wrestler/wrestlerService';

const WrestlerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wrestler, setWrestler] = useState({
    FullName: '',
    Nickname: '',
    Brand: '',
    Gender: '',
    FightStyle: '',
    Hometown: '',
    Nationality: '',
    Height: '',
    Weight: '',
    HeelOrFace: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWrestler = async () => {
      try {
        const data = await getWrestlerById(id);
        setWrestler(data);
      } catch (err) {
        setError('Failed to load wrestler details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWrestler();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWrestler((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWrestler(id, wrestler);
      alert('Wrestler updated successfully!');
      navigate(`/wrestler/${id}`);
    } catch (err) {
      console.error('Failed to update wrestler:', err);
      alert('Failed to update wrestler. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading wrestler details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Wrestler</h1>

      {/* Full Name ve Nickname Gösterim */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Full Name: {wrestler.FullName}</h2>
        <h3 className="text-xl">Nickname: {wrestler.Nickname}</h3>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-bold mb-2">Brand</label>
          <select
            name="Brand"
            value={wrestler.Brand}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Brand</option>
            <option value="Raw">Raw</option>
            <option value="Smackdown">Smackdown</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-bold mb-2">Gender</label>
          <select
            name="Gender"
            value={wrestler.Gender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Fight Style */}
        <div>
          <label className="block text-sm font-bold mb-2">Fight Style</label>
          <select
            name="FightStyle"
            value={wrestler.FightStyle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Fight Style</option>
            <option value="Cruiser">Cruiser</option>
            <option value="Giant">Giant</option>
            <option value="Fighter">Fighter</option>
            <option value="Brawler">Brawler</option>
            <option value="Specialist">Specialist</option>
          </select>
        </div>

        {/* Diğer Alanlar */}
        <div>
          <label className="block text-sm font-bold mb-2">Hometown</label>
          <input
            type="text"
            name="Hometown"
            value={wrestler.Hometown}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Nationality</label>
          <input
            type="text"
            name="Nationality"
            value={wrestler.Nationality}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Height</label>
          <input
            type="number"
            name="Height"
            value={wrestler.Height}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Weight</label>
          <input
            type="number"
            name="Weight"
            value={wrestler.Weight}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        {/* Heel or Face */}
        <div>
          <label className="block text-sm font-bold mb-2">Heel or Face</label>
          <select
            name="HeelOrFace"
            value={wrestler.HeelOrFace}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select Alignment</option>
            <option value="Heel">Heel</option>
            <option value="Face">Face</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default WrestlerEditPage;
