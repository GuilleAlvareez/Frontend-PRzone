/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Exercises, HouseIcon, Workouts, Graph } from "../Icons";
import { Link, useLocation } from 'react-router-dom';
import { SidebarContext } from "../../context/SideBarContext";
import { LogOutButton } from "../Auth/LogOutButton";

export function NavBar() {
    const { sideBarOpen } = useContext(SidebarContext);
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    
    const fetchUser = async () => {
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
                    const userData = await response.json();
                    setUser(userData);
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
            }
        };
    
        useEffect(() => {
            fetchUser();
        }, []);
    
        const cleanUser = () => {
            setUser(null);
        }
    return (
        <nav className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <h1 className="font-bold text-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PRzone</h1>
            </div>
            
            <div className="h-full flex flex-col gap-3 justify-between p-4">
                <ul className="flex flex-col gap-2 flex-grow">
                    <li>
                        <Link 
                            to="/dashboard" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                isActive('/dashboard') 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <HouseIcon 
                                width="20" 
                                height="20" 
                                className="text-blue-500" 
                            />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/exercises" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                isActive('/exercises') 
                                    ? 'bg-purple-100 text-purple-600' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Exercises 
                                width="20" 
                                height="20" 
                                className="text-purple-500" 
                            />
                            <span className="font-medium">Exercises</span>
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/progress" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                isActive('/progress') 
                                    ? 'bg-rose-100 text-rose-600' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Graph 
                                width="20" 
                                height="20" 
                                className="text-rose-500" 
                            />
                            <span className="font-medium">Progress</span>
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/workouts" 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                isActive('/workouts') 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Workouts 
                                width="20" 
                                height="20" 
                                className="text-green-500" 
                            />
                            <span className="font-medium">Workouts</span>
                        </Link>
                    </li>
                </ul>

                <LogOutButton handle={cleanUser}/>

            </div>
        </nav>
    );
}
