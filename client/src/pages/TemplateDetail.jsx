import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [template, setTemplate] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    api
      .get(`/templates/${id}`)
      .then(({ data }) => setTemplate(data.template))
      .catch(() => setError('This template could not be found.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsFavorited(false);
      return;
    }
    api
      .get('/favorites')
      .then(({ data }) => setIsFavorited(data.templates.some((t) => t._id === id)))
      .catch(() => {});
  }, [id, isAuthenticated]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${id}`);
        setIsFavorited(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorited(true);
      }
    } catch {
      setError('Could not update favorites. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="w-full px-6 lg:px-10 py-10">
        <p className="text-smoke-500 text-sm">Loading template...</p>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="w-full px-6 lg:px-10 py-10">
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 inline-block">
          {error || 'Template not found.'}
        </p>
        <div className="mt-4">
          <Link to="/templates" className="text-sm font-medium text-accent hover:underline">
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 lg:px-10 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-smoke-500 hover:text-accent transition-colors"
      >
        <span aria-hidden="true">&larr;</span> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden border border-smoke-200 bg-smoke-100">
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-smoke-100 text-smoke-600 border border-smoke-200">
            {template.category}
          </span>

          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-smoke-900">
            {template.name}
          </h1>

          <p className="mt-4 text-base text-smoke-600 leading-relaxed">{template.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleToggleFavorite}
              className={`px-5 py-2.5 rounded-md text-sm font-medium border transition-colors ${
                isFavorited
                  ? 'bg-accent text-white border-accent hover:bg-accent-dark'
                  : 'bg-transparent text-smoke-700 border-smoke-300 hover:border-accent hover:text-accent'
              }`}
            >
              {isFavorited ? 'Favorited ✓' : 'Add to Favorites'}
            </button>

            <Link
              to="/templates"
              className="px-5 py-2.5 rounded-md border border-smoke-300 text-smoke-700 font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Browse more templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
