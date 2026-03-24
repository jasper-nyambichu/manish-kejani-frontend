// src/pages/admin/AdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/store/authStore';

const AdminLogin = () => {
  const navigate  = useNavigate();
  const { login } = useAdminAuth();

  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);

    const success = await login(form.username.trim(), form.password);

    setLoading(false);

    if (success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl text-foreground mb-1">Manish Kejani</h1>
          <p className="text-sm font-body text-muted-foreground">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-card p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-sm font-body text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-primary text-primary-foreground rounded-button font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;