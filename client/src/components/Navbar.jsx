import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-smoke-200 bg-smoke-50/90 backdrop-blur sticky top-0 z-10">
      <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-lg font-semibold tracking-tight text-smoke-900"
        >
          Template Store
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-smoke-600">
          <Link
            to="/templates"
            className={`transition-colors ${
              location.pathname.startsWith('/templates')
                ? 'text-accent font-semibold'
                : 'hover:text-accent'
            }`}
          >
            Templates
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorites"
              className={`transition-colors ${
                location.pathname === '/favorites'
                  ? 'text-accent font-semibold'
                  : 'hover:text-accent'
              }`}
            >
              My Favorites
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-4 border-l border-smoke-200">
              <span className="text-smoke-500 hidden sm:inline">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md border border-smoke-300 text-smoke-700 hover:bg-smoke-200 hover:border-smoke-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hover:text-accent transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent-dark transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
