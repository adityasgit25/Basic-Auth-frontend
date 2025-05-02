import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login, error, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
          {/* Header */}
          <div className="pt-6 pb-2 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-700 mx-auto flex items-center justify-center mb-2">
              <User size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mt-4">SIGN IN</h2>
          </div>
          
          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.email ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    placeholder="Email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.email.message}
                  </p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.password ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    placeholder="Password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.password.message}
                  </p>
                )}
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center mb-6 text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-500 rounded focus:ring-teal-400 border-gray-500 bg-blue-700/50"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-teal-400 hover:text-teal-300 transition">
                  Forgot password?
                </a>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm flex items-center">
                  <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-teal-400 text-blue-900 font-semibold text-lg transition-all hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {loading ? 'Signing in...' : 'LOGIN'}
              </button>
              
              {/* Register Link */}
              <p className="mt-6 text-center text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="text-teal-400 hover:text-teal-300 transition">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;