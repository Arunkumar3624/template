import { Link } from 'react-router-dom';

export default function TemplateCard({ template, isFavorited, onToggleFavorite, authRequired }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    onToggleFavorite(template);
  };

  return (
    <Link
      to={`/templates/${template._id}`}
      className="group bg-white border border-smoke-200 rounded-xl overflow-hidden flex flex-col transition-shadow hover:shadow-lg hover:shadow-smoke-300/40"
    >
      <div className="aspect-[4/3] overflow-hidden bg-smoke-100">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-smoke-900 group-hover:text-accent transition-colors">
            {template.name}
          </h3>
          <span className="shrink-0 text-xs font-medium px-2 py-1 rounded-full bg-smoke-100 text-smoke-600 border border-smoke-200">
            {template.category}
          </span>
        </div>

        <p className="mt-2 text-sm text-smoke-600 flex-1">{template.description}</p>

        <div className="mt-4">
          <button
            onClick={handleFavoriteClick}
            title={authRequired ? 'Login to favorite templates' : undefined}
            className={`w-full py-2 rounded-md text-sm font-medium border transition-colors ${
              isFavorited
                ? 'bg-accent text-white border-accent hover:bg-accent-dark'
                : 'bg-transparent text-smoke-700 border-smoke-300 hover:border-accent hover:text-accent'
            }`}
          >
            {isFavorited ? 'Favorited ✓' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </Link>
  );
}
