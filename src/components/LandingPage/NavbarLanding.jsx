/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { HeaderIcon } from '../Icons';
import { useEffect, useState } from 'react';
import { LogOutButton } from '../Auth/LogOutButton';
import { useNavigate } from 'react-router-dom';

export default function NavbarLanding() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/api/me', {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json', // Not strictly needed for simple GET
                },
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/dashboard');
            } else if (response.status === 401) {
                setUser(null);
            } else {
                setError(`Error ${response.status}: ${response.statusText}`);
                setUser(null);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setError("No se pudo conectar con el servidor.");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const cleanUser = () => {
        setUser(null);
    }

    if (loading) {
        return (
            <nav className='fixed z-50 backdrop-blur-lg w-screen h-16 flex justify-between items-center px-20 border-b border-gray-300'>
                <div className='flex items-center gap-3'>
                    <HeaderIcon width={24} height={24}/>
                    <h1 className='text-2xl font-bold'>PRzone</h1>
                </div>
                <div>Cargando...</div>
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
            
            {!user ? 
                <div className='flex gap-4'>
                    <Link to='/login' className='cursor-pointer py-2 px-4 rounded border bg-white border-gray-300 hover:bg-gray-100'>Login</Link>
                    <Link to='/register' className='cursor-pointer py-2 px-4 bg-black text-white rounded hover:bg-[#1c1c1c]'>Sign Up</Link>
                </div>
            :
                <LogOutButton handle={cleanUser}/>
            }
        </nav>
    )
}