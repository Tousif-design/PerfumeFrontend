import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Unexpected response from server (status ${response.status})`);
      }

      const data = await response.json();
      
      // Fixed: Check response status and handle errors properly
      if (!response.ok) {
        // Don't navigate on login failure, show error message
        throw new Error(data.message || 'Login failed');
      }

      if (!data.user?.isAdmin) {
        throw new Error('Only admins can log in.');
      }

      const adminAuth = {
        token: data.token,
        user: data.user,
        isAdmin: true,
      };

      // Remember Me → store in localStorage, else in sessionStorage
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem('adminAuth', JSON.stringify(adminAuth));
      storage.setItem('user', JSON.stringify(data.user));
      storage.setItem('token', data.token);
      storage.setItem('isAdmin', 'true');

      console.log('Login successful, admin auth:', adminAuth);

      if (onLoginSuccess) onLoginSuccess(adminAuth);

      // Only navigate on successful login
      navigate('/collections');

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-wider">PREMIUM ITTARS</h1>
          <p className="text-sm text-white/90 mt-1">NATURAL PERFUMERY</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Email"
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-800">
                Remember me
              </label>
            </div>

            <button 
              onClick={() => {}}
              className="text-sm text-amber-600 hover:text-amber-800 disabled:opacity-50"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 px-4 rounded-lg font-medium tracking-wider hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-xs text-amber-700">
              Admin access only
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-12 left-12 w-20 h-20 opacity-20">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 to-transparent"></div>
      </div>
    </section>
  );
};

export default Login;