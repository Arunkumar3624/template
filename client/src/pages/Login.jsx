import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form);
      navigate('/templates');
    } catch (err) {
      const fieldError = err.response?.data?.errors?.[0]?.message;
      setError(fieldError || err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-smoke-500 hover:text-accent transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Back
        </button>

        <div className="bg-white border border-smoke-200 rounded-xl p-8">
          <h1 className="text-xl font-semibold text-smoke-900">Welcome back</h1>
          <p className="mt-1 text-sm text-smoke-500">Log in to manage your favorites.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-smoke-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-smoke-300 bg-smoke-50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-smoke-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-smoke-300 bg-smoke-50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-accent text-white font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-smoke-500 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
