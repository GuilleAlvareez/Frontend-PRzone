import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm () {
    const inputUsername = useRef();
    const inputPassword = useRef();
    const inputEmail = useRef();
    const navigate = useNavigate();

    const handleButton = async () => {
      const user = {
        username: inputUsername.current.value,
        password: inputPassword.current.value,
        email: inputEmail.current.value
      }

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      console.log(response)
      const data = await response.json();
      console.log("no llega")

      console.log('Usuario logueado:', data);
      navigate('/');
    }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='flex flex-col gap-2  w-1/3 border-gray-300 border rounded-lg p-5 shadow-lg'>
        <div className='w-full flex flex-col gap-2 justify-center items-center'>
          <h1 className='text-4xl font-bold'>Create an account</h1>
          <p className='text-gray-500'>Enter your information to get started</p>
        </div>

        <form className='flex flex-col'>
          <div className='flex flex-col gap-2'>
            <label>Username:</label>
            <input className='border border-gray-300 rounded px-3 py-2 mb-2' ref={inputUsername} type="text" name="username" required />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Password:</label>
            <input className='border border-gray-300 rounded px-3 py-2 mb-2' ref={inputPassword} type="password" name="username" required />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Email:</label>
            <input className='border border-gray-300 rounded px-3 py-2 mb-2' ref={inputEmail} type="email" name="username" required />
          </div>
        </form>

        <button onClick={handleButton} className='bg-black w-full px-3 py-2 rounded text-white font-semibold cursor-pointer transition-colors duration-100 ease-linear hover:bg-[#2f2f31]'>Register</button>
      </div>
    </div>
  );
};

export default LoginForm;
