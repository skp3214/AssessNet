import React, { useState } from 'react';
import authService from '../services/auth.service.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      let response = await authService.login({ email, password });
      if (response) {
        dispatch(login(response.data));
        navigate('/test-env');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-6xl text-indigo-500">
          Welcome To <span className='text-indigo-700'>AssessNet</span>
        </h2>
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-indigo-950">
            Login To Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading} 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div>
            <p>Don't have a account ? <a className="cursor-pointer text-blue-800" onClick={()=>navigate('/signup')}>Register Here</a>  </p>
          </div>
        </form>
      </div>

      {error && (
        <div className="absolute top-24  bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          <span>{error}</span>
          <button
            className="ml-4 text-white"
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
