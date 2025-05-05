import { useContext } from "react";
import { SettingsIcon, SideBar } from "../Icons";
import { SidebarContext } from "../../context/SideBarContext";

export function Header() {
    const { toggleSideBar } = useContext(SidebarContext);

    return (
        <div className={`w-full max-w-full h-16 flex justify-between items-center px-5 border-b border-gray-300 transition-all duration-300`}>
            <div className="flex items-center gap-2 px-2">
                <button className="p-1 rounded-2xl cursor-pointer transition-all duration-100 ease-linear hover:-translate-x-0.5" onClick={toggleSideBar}>
                    <SideBar />
                </button>

                <h1 className="font-bold text-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">PRzone</h1>
            </div>

            <button className="group p-3 transition-all duration-100 ease-linear cursor-pointer">
                <SettingsIcon width={24} height={24} className="transition-all duration-100 ease-linear group-hover:scale-110"/>
            </button>
        </div>
    )
}