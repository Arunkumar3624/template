import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';
import Reveal from '../components/Reveal';

export default function Favorites() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavorites = () => {
    setLoading(true);
    api
      .get('/favorites')
      .then(({ data }) => setTemplates(data.templates))
      .catch(() => setError('Could not load your favorites. Please try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (template) => {
    try {
      await api.delete(`/favorites/${template._id}`);
      setTemplates((prev) => prev.filter((t) => t._id !== template._id));
    } catch {
      setError('Could not remove this favorite. Please try again.');
    }
  };

  return (
    <div className="w-full px-6 lg:px-10 py-10">
      <h1 className="text-2xl font-semibold text-smoke-900 tracking-tight">My Favorites</h1>
      <p className="text-sm text-smoke-500 mt-1">Templates you've saved for later.</p>

      {error && (
        <p className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="mt-8">
        {loading ? (
          <p className="text-smoke-500 text-sm">Loading favorites...</p>
        ) : templates.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-smoke-300 rounded-xl">
            <p className="text-smoke-500 text-sm">You haven't favorited any templates yet.</p>
            <Link to="/templates" className="mt-3 inline-block text-accent font-medium hover:underline text-sm">
              Browse templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {templates.map((template, index) => (
              <Reveal key={template._id} delay={(index % 10) * 60}>
                <TemplateCard
                  template={template}
                  isFavorited
                  onToggleFavorite={handleRemove}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
