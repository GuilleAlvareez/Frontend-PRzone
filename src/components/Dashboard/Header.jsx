import { SideBar } from "../Icons";

export function Header({ sideBarOpen, toggleSideBar}) {
    return (
        <div className={`w-full h-16 flex justify-between items-center px-5 border-b border-gray-300 transition-all duration-300 ${sideBarOpen ? 'ml-64' : 'ml-0'}`}>
            <button className="p-1 rounded-2xl hover:bg-gray-200" onClick={toggleSideBar}>
                <SideBar />
            </button>
        </div>
    )
}