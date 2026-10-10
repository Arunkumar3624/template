import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const linkClass = (isActive) =>
    `transition-colors ${isActive ? 'text-accent font-semibold' : 'hover:text-accent'}`;

  return (
    <header className="border-b border-smoke-200 bg-smoke-50/90 backdrop-blur sticky top-0 z-20">
      <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-lg font-semibold tracking-tight text-smoke-900"
        >
          Template Store
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-smoke-600">
          <Link to="/templates" className={linkClass(location.pathname.startsWith('/templates'))}>
            Templates
          </Link>

          {isAuthenticated && (
            <Link to="/favorites" className={linkClass(location.pathname === '/favorites')}>
              My Favorites
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-4 border-l border-smoke-200">
              <span className="text-smoke-500">{user?.name}</span>
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

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden p-2 -mr-2 text-smoke-700"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="sm:hidden border-t border-smoke-200 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-smoke-600 bg-smoke-50">
          <Link
            to="/templates"
            onClick={() => setMenuOpen(false)}
            className={linkClass(location.pathname.startsWith('/templates'))}
          >
            Templates
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className={linkClass(location.pathname === '/favorites')}
            >
              My Favorites
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center justify-between pt-3 border-t border-smoke-200">
              <span className="text-smoke-500">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md border border-smoke-300 text-smoke-700 hover:bg-smoke-200 hover:border-smoke-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-3 border-t border-smoke-200">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-accent transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent-dark transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
