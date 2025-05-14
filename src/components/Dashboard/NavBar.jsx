import { useContext } from "react";
import { Exercises, HouseIcon, Workouts } from "../Icons";
import { Link, useLocation } from 'react-router-dom';
import { SidebarContext } from "../../context/SideBarContext";

export function NavBar() {
    const { sideBarOpen } = useContext(SidebarContext);
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    
    return (
        <nav className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <h1 className="font-bold text-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PRzone</h1>
            </div>
            
            <div className="p-4">
                <ul className="flex flex-col gap-2">
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
            </div>
        </nav>
    );
}
