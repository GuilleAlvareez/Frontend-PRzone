import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- NUEVO IMPORT DEL HOOK ---
import { useAuth } from '../../hooks/useAuth';

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();

  const inputName = useRef();
  const inputPassword = useRef();
  const inputEmail = useRef();
  const inputUsername = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: inputName.current.value,
      password: inputPassword.current.value,
      email: inputEmail.current.value,
      username: inputUsername.current.value,
    };

    if (!userData.name || !userData.password || !userData.email || !userData.username) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    try {
      await register(userData);
      
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate('/login');

    } catch (err) {
      console.error("Registration failed on component level:", err.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md border-gray-300 border rounded-lg p-6 shadow-lg bg-white'>
        <div className='w-full flex flex-col gap-1 justify-center items-center'>
          <h1 className='text-3xl font-bold'>Create an account</h1>
          <p className='text-gray-500 text-sm'>Enter your information to get started</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm" role="alert">
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label>Name:</label>
            <input className='border border-gray-300 rounded px-3 py-2' ref={inputName} type="text" name="name" required disabled={isLoading} />
          </div>

          <div className='flex flex-col gap-1'>
            <label>Username:</label>
            <input className='border border-gray-300 rounded px-3 py-2' ref={inputUsername} type="text" name="username" required disabled={isLoading} />
          </div>

          <div className='flex flex-col gap-1'>
            <label>Password:</label>
            <input className='border border-gray-300 rounded px-3 py-2' ref={inputPassword} type="password" name="password" required disabled={isLoading} />
          </div>

          <div className='flex flex-col gap-1'>
            <label>Email:</label>
            <input className='border border-gray-300 rounded px-3 py-2' ref={inputEmail} type="email" name="email" required disabled={isLoading} />
          </div>
        </div>

        <button
          type="submit"
          className='bg-black w-full px-3 py-2 rounded text-white font-semibold cursor-pointer transition-colors duration-100 ease-linear hover:bg-[#2f2f31] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Register'
          )}
        </button>
        
        <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
           <Link to="/login" className="font-medium text-black hover:underline">
              Sign in
           </Link>
         </p>
      </form>
    </div>
  );
};