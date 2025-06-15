import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// --- NUEVO IMPORT DEL HOOK ---
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  
  const inputEmail = useRef();
  const inputPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    if (!email || !password) {
      return;
    }

    try {
      await login({ email, password });
      
      navigate('/dashboard');

    } catch (err) {
      console.error("Login failed on component level:", err.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray-50 dark:bg-gray-900'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md border-gray-300 dark:border-gray-600 border rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800'>
        <div className='w-full flex flex-col gap-1 justify-center items-center'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Login</h1>
          <p className='text-gray-500 dark:text-gray-400 text-sm'>Enter your information to continue</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-2 rounded relative text-sm" role="alert">
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email-input" className='text-sm font-medium text-gray-900 dark:text-gray-100'>Email:</label>
            <input
              id="email-input"
              className='border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-shadow'
              ref={inputEmail}
              type="email"
              name="email"
              required
              disabled={isLoading}
              placeholder='tu@email.com'
            />
          </div>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor='password-input' className='text-sm font-medium text-gray-900 dark:text-gray-100'>Password:</label>
            <input
              id="password-input"
              className='border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-shadow'
              ref={inputPassword}
              type="password"
              name="password"
              required
              disabled={isLoading}
              placeholder='••••••••'
            />
          </div>
        </div>

        <button
          type="submit"
          className='bg-black dark:bg-white w-full px-3 py-2 rounded text-white dark:text-black font-semibold cursor-pointer transition-colors duration-100 ease-linear hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-black dark:text-white hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
