import { useContext } from "react";
import { Exercises, HouseIcon, Workouts } from "../Icons";
import { Link } from 'react-router-dom';
import { SidebarContext } from "../../context/SideBarContext";

export function NavBar() {
    const { sideBarOpen } = useContext(SidebarContext);
    return (
        <nav className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#f0f4f9] border-r border-gray-300 transform transition-transform duration-300 ease-in-out ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <ul className="flex flex-col gap-3 p-5">
            <li className="w-full rounded-full hover:bg-[#e4e8ed] transition duration-300">
                    <Link to="/dashboard" className="group flex justify-start items-center gap-2.5 px-3 py-2">
                        <HouseIcon width="20" height="20" className="transform group-hover:scale-110 transition duration-300" />
                        <p className="font-semibold">Dashboard</p>
                    </Link>
                </li>

                <li className="w-full rounded-full hover:bg-[#e4e8ed] transition duration-300">
                    <Link to="/exercises" className="group flex justify-start items-center gap-2.5 px-3 py-2">
                        <Exercises width="20" height="20" className="transform group-hover:scale-110 transition duration-300"/>
                        <p className="font-semibold">Exercises</p>
                    </Link>
                </li>

                <li className="w-full rounded-full hover:bg-[#e4e8ed] transition duration-300">
                    <Link to="/workouts" className="group flex justify-start items-center gap-2.5 px-3 py-2">
                        <Workouts width="20" height="20" className="transform group-hover:scale-110 transition duration-300" />
                        <p className="font-semibold">Workouts</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}