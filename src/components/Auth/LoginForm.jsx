import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

export function LoginForm() {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleButton = async () => {
    if (!inputEmail.current.value || !inputPassword.current.value) {
      setError('Por favor, ingresa email y contraseña.');
      return;
    }

    setLoading(true); // Inicia estado de carga
    setError(null); // Limpia errores previos

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputEmail.current.value,
          password: inputPassword.current.value,
        }),
        // Importante si tu frontend y backend están en diferentes puertos/dominios
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Login exitoso:', data.user);
        navigate('/dashboard'); 

      } else {
        const errorMessage = data?.message || `Error: ${response.statusText || response.status}`;
        console.error('Error de login:', errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error de fetch:', err);
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='flex flex-col gap-4 w-full max-w-md border-gray-300 border rounded-lg p-6 shadow-lg bg-white'>
        {/* Encabezado */}
        <div className='w-full flex flex-col gap-1 justify-center items-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-gray-500 text-sm'>Enter your information to continue</p>
        </div>

        {/* Muestra errores */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email-input" className='text-sm font-medium'>Email:</label>
            <input
              id="email-input"
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow'
              ref={inputEmail}
              type="email"
              name="email"
              required
              disabled={loading} // Deshabilita mientras carga
              placeholder='tu@email.com'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password-input' className='text-sm font-medium'>Password:</label>
            <input
              id="password-input"
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow'
              ref={inputPassword}
              type="password"
              name="password"
              required
              disabled={loading} // Deshabilita mientras carga
              placeholder='••••••••'
            />
          </div>
        </div>

        <button
          onClick={handleButton}
          className='bg-black w-full px-3 py-2 rounded text-white font-semibold cursor-pointer transition-colors duration-100 ease-linear hover:bg-[#2f2f31] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center'
          disabled={loading}
        >
          {loading ? (
             // Ícono simple de carga
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>

         {/* Enlace a Registro (opcional) */}
         <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{' '}
           <Link to="/register" className="font-medium text-black hover:underline">
              Sign up
           </Link>
         </p>
      </div>
    </div>
  );
};