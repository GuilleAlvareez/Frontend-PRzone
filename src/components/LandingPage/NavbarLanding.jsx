import { Link, useNavigate } from 'react-router-dom';
import { HeaderIcon } from '../Icons';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function NavbarLanding() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <nav className='fixed z-50 backdrop-blur-lg w-screen h-16 flex justify-between items-center px-20 border-b border-gray-300'>
        <div className='flex items-center gap-3'>
          <HeaderIcon width={24} height={24}/>
          <h1 className='text-2xl font-bold'>PRzone</h1>
        </div>

        <div className='flex gap-4'>
          <div className='py-2 px-4 rounded border bg-gray-200 animate-pulse w-20 h-10'></div>
          <div className='py-2 px-4 bg-gray-300 text-white rounded animate-pulse w-24 h-10'></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className='fixed z-50 backdrop-blur-lg w-screen h-16 flex justify-between items-center px-20 border-b border-gray-300'>
      <div className='flex items-center gap-3'>
        <HeaderIcon width={24} height={24}/>
        <h1 className='text-2xl font-bold'>PRzone</h1>
      </div>

      <ul className='flex gap-6'>
        <li className='text-gray-600 hover:text-black'>Features</li>
        <li className='text-gray-600 hover:text-black'>Programs</li>
        <li className='text-gray-600 hover:text-black'>About</li>
      </ul>
      
      <div className='flex gap-4'>
        <Link to='/login' className='cursor-pointer py-2 px-4 rounded border bg-white border-gray-300 hover:bg-gray-100'>Login</Link>
        <Link to='/register' className='cursor-pointer py-2 px-4 bg-black text-white rounded hover:bg-[#1c1c1c]'>Sign Up</Link>
      </div>
    </nav>
  );
}