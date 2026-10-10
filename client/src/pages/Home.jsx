import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';
import Reveal from '../components/Reveal';
import { useAuth } from '../context/AuthContext';

const HERO_IMAGE_PRIMARY =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80';
const HERO_IMAGE_SECONDARY =
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  useEffect(() => {
    api.get('/templates/meta/categories').then(({ data }) => setCategories(data.categories));
    api.get('/templates').then(({ data }) => setFeatured(data.templates.slice(0, 4)));
  }, []);

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
    } catch {}
  };

  return (
    <div className="w-full">
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 ease-out ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
              23 templates, 7 categories
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-smoke-900 leading-tight">
              Find a template,Save it.
              <br />
              Build on it.
            </h1>
            <p className="mt-4 text-base text-smoke-600 max-w-md">
              A small collection of landing pages, dashboards, admin panels, portfolios and more. Browse at your own pace, favorite what fits, and pick it back up whenever
              you're ready to start building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/templates"
                className="px-5 py-2.5 rounded-md bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
              >
                Browse Templates
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-md border border-smoke-300 text-smoke-700 font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  Create an account
                </Link>
              )}
            </div>
          </div>

          <div
            className={`relative h-80 sm:h-96 transition-all duration-700 ease-out delay-150 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <img
              src={HERO_IMAGE_PRIMARY}
              alt="Dashboard template preview"
              className="absolute top-0 right-0 w-3/4 h-3/4 object-cover rounded-xl shadow-lg border border-smoke-200"
              loading="eager"
            />
            <img
              src={HERO_IMAGE_SECONDARY}
              alt="Analytics template preview"
              className="absolute bottom-0 left-0 w-3/5 h-3/5 object-cover rounded-xl shadow-lg border border-smoke-200"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="px-6 lg:px-10 pb-16">
          <Reveal>
            <p className="text-xs font-semibold tracking-wide uppercase text-smoke-500 mb-4">
              Browse by category
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/templates?category=${encodeURIComponent(category)}`}
                  className="px-4 py-2 rounded-full border border-smoke-300 bg-white text-sm font-medium text-smoke-600 hover:border-accent hover:text-accent transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {featured.length > 0 && (
        <section className="px-6 lg:px-10 pb-20">
          <Reveal>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl font-semibold text-smoke-900 tracking-tight">
                A few to start with
              </h2>
              <Link to="/templates" className="text-sm font-medium text-accent hover:underline">
                See all templates
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((template, index) => (
              <Reveal key={template._id} delay={index * 80}>
                <TemplateCard
                  template={template}
                  isFavorited={favoriteIds.has(template._id)}
                  onToggleFavorite={handleToggleFavorite}
                  authRequired={!isAuthenticated}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
