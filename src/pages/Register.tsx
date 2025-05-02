import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, KeyRound, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

const Register: React.FC = () => {
  const { register, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register: registerField, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<RegisterFormData>();

  const password = watch('password', '');

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    await register(data.name, data.email, data.password, data.dateOfBirth);
  };

  // Calculate max date (must be at least 18 years old)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
          {/* Header */}
          <div className="pt-6 pb-2 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-700 mx-auto flex items-center justify-center mb-2">
              <User size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-200 mt-2">CREATE ACCOUNT</h2>
          </div>
          
          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.name ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    placeholder="Full Name"
                    {...registerField('name', { 
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.name.message}
                  </p>
                )}
              </div>
              
              {/* Date of Birth Field */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    max={maxDateString}
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    {...registerField('dateOfBirth', { 
                      required: 'Date of birth is required',
                      validate: (value) => {
                        const dob = new Date(value);
                        const today = new Date();
                        const age = today.getFullYear() - dob.getFullYear();
                        return age >= 18 || 'You must be at least 18 years old';
                      }
                    })}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.email ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    placeholder="Email"
                    {...registerField('email', { 
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
                    {...registerField('password', { 
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
              
              {/* Confirm Password Field */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className={`w-full pl-10 pr-3 py-3 rounded-md bg-blue-700/50 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-blue-600'
                    } text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400`}
                    placeholder="Confirm Password"
                    {...registerField('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match'
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword.message}
                  </p>
                )}
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
                {loading ? 'Registering...' : 'REGISTER'}
              </button>
              
              {/* Login Link */}
              <p className="mt-6 text-center text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-400 hover:text-teal-300 transition">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;