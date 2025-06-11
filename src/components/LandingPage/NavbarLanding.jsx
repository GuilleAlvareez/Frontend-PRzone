import { Link, useNavigate } from 'react-router-dom';
import { HeaderIcon } from '../Icons';
import { useEffect } from 'react';
// --- NUEVO IMPORT DEL HOOK ---
import { useAuth } from '../../hooks/useAuth';

// Ya no necesitamos LogOutButton aquí, ya que el usuario logueado será redirigido.
// Si quisiéramos mostrarlo, lo importaríamos.

export default function NavbarLanding() {
  // --- USO DE HOOKS ---
  // 1. Obtenemos el usuario y el estado de carga de nuestro hook.
  //    El hook `useAuth` ya se encarga de llamar a `fetchCurrentUser` en su propio `useEffect`.
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // --- LÓGICA DE REDIRECCIÓN SIMPLIFICADA ---
  // 2. Usamos un `useEffect` que reacciona a los cambios en `user` y `isLoading`.
  useEffect(() => {
    // Si la carga ha terminado Y existe un usuario, lo redirigimos al dashboard.
    if (!isLoading && user) {
      navigate('/dashboard');
    }
    // No necesitamos un `else` porque si no hay usuario, simplemente no hacemos nada
    // y el componente renderizará los botones de Login/Sign Up.
  }, [user, isLoading, navigate]); // Dependencias del efecto

  // --- RENDERIZADO CONDICIONAL ---

  // 3. Mostramos un estado de carga mientras el hook determina si hay una sesión activa.
  //    Esto previene un "parpadeo" donde se muestran los botones de login por un instante
  //    antes de la redirección.
  if (isLoading) {
    return (
      <nav className='fixed z-50 backdrop-blur-lg w-screen h-16 flex justify-between items-center px-20 border-b border-gray-300'>
        <div className='flex items-center gap-3'>
          <HeaderIcon width={24} height={24}/>
          <h1 className='text-2xl font-bold'>PRzone</h1>
        </div>
        {/* Podemos mostrar un indicador de carga más sutil o nada en los botones */}
        <div className='flex gap-4'>
          <div className='py-2 px-4 rounded border bg-gray-200 animate-pulse w-20 h-10'></div>
          <div className='py-2 px-4 bg-gray-300 text-white rounded animate-pulse w-24 h-10'></div>
        </div>
      </nav>
    );
  }

  // 4. Si la carga ha terminado y no hay usuario, mostramos la barra de navegación completa.
  //    Si hubiera un usuario, el `useEffect` ya nos habría redirigido.
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
      
      {/* Esta condición es ahora más simple. Si llegamos aquí, sabemos que no hay usuario. */}
      <div className='flex gap-4'>
        <Link to='/login' className='cursor-pointer py-2 px-4 rounded border bg-white border-gray-300 hover:bg-gray-100'>Login</Link>
        <Link to='/register' className='cursor-pointer py-2 px-4 bg-black text-white rounded hover:bg-[#1c1c1c]'>Sign Up</Link>
      </div>
    </nav>
  );
}