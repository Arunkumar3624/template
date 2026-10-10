import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';
import Reveal from '../components/Reveal';

export default function Templates() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState('');
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/templates/meta/categories').then(({ data }) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');

    const params = activeCategory ? { category: activeCategory } : {};

    api
      .get('/templates', { params })
      .then(({ data }) => setTemplates(data.templates))
      .catch(() => setError('Could not load templates. Please try again.'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavoriteIds(new Set());
      return;
    }
    api
      .get('/favorites')
      .then(({ data }) => setFavoriteIds(new Set(data.templates.map((t) => t._id))))
      .catch(() => {});
  }, [isAuthenticated]);

  const handleToggleFavorite = async (template) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const isFavorited = favoriteIds.has(template._id);

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${template._id}`);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(template._id);
          return next;
        });
      } else {
        await api.post(`/favorites/${template._id}`);
        setFavoriteIds((prev) => new Set(prev).add(template._id));
      }
    } catch {
      setError('Could not update favorites. Please try again.');
    }
  };

  const visibleTemplates = useMemo(() => {
    if (!search.trim()) return templates;
    const q = search.trim().toLowerCase();
    return templates.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [templates, search]);

  return (
    <div className="w-full px-6 lg:px-10 py-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-smoke-500 hover:text-accent transition-colors"
      >
        <span aria-hidden="true">&larr;</span> Back to home
      </Link>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-smoke-900 tracking-tight">Browse the Collection</h1>
          <p className="text-sm text-smoke-500 mt-1">Find a starting point, save it, come back when you're ready to build.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCategory('');
              setSearchParams({});
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === ''
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-smoke-600 border-smoke-300 hover:border-accent hover:text-accent'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSearchParams({ category });
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === category
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-smoke-600 border-smoke-300 hover:border-accent hover:text-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 rounded-md border border-smoke-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm"
        />
      </div>

      {error && (
        <p className="mt-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="mt-8">
        {loading ? (
          <p className="text-smoke-500 text-sm">Loading templates...</p>
        ) : visibleTemplates.length === 0 ? (
          <p className="text-smoke-500 text-sm">No templates match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {visibleTemplates.map((template, index) => (
              <Reveal key={template._id} delay={(index % 10) * 60}>
                <TemplateCard
                  template={template}
                  isFavorited={favoriteIds.has(template._id)}
                  onToggleFavorite={handleToggleFavorite}
                  authRequired={!isAuthenticated}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
