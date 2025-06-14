/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { DarkModeIcon, SunIcon, SideBar } from "../Icons";
import { SidebarContext } from "../../context/SideBarContext";
import { useTheme } from "../../context/ThemeContext";
import { LogOutButton } from "../Auth/LogOutButton";

export function Header() {
    const { toggleSideBar } = useContext(SidebarContext);
    const { theme, toggleTheme } = useTheme();
    
    return (
        <div className="w-full max-w-full h-16 flex justify-between items-center px-5 border-b border-gray-300 dark:bg-slate-800 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center gap-2 px-2">
                <button className="p-1 rounded-2xl cursor-pointer transition-all duration-100 ease-linear hover:-translate-x-0.5" onClick={toggleSideBar}>
                    <SideBar />
                </button>

                <h1 className="font-bold text-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PRzone</h1>
            </div>

            <button 
                className="group p-3 transition-all duration-100 ease-linear cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {theme === 'dark' ? <SunIcon width={24} height={24} /> : <DarkModeIcon width={24} height={24} />}
            </button>
        </div>
    )
}
