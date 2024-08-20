import React, { useState } from 'react';
import authService from '../services/auth.service.js';
import { useNavigate } from 'react-router-dom';
import { signup } from '../store/authSlice.js';
import { useDispatch } from 'react-redux';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await authService.signup({ name, email, password });
            if (!response) {
                console.log(response)
                setError('Enter Unique Email');
            } else {
                dispatch(signup(response.data));
                navigate('/test-env');
            }
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-6xl text-indigo-500">
                    Welcome To <span className='text-indigo-700'>AssessNet</span>
                </h2>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-indigo-950">
                        Create Your Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            {loading ? 'Signing Up...' : 'SignUp'}
                        </button>
                    </div>
                    <div>
                        <p>already have a account ? <a className="cursor-pointer text-blue-800" onClick={()=>navigate('/login')}>click to login </a>  </p>
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

export default Signup;