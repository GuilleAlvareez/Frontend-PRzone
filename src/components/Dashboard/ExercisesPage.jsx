import { useContext } from 'react';
import { SidebarContext } from '../../context/SideBarContext';

export function ExercisesPage() {
    const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
    return (
        <div className="w-screen h-screen flex">
            <NavBar sideBarOpen={sideBarOpen}/>

            <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? 'ml-64' : 'ml-0'}`}>
                <Header toggleSideBar={toggleSideBar} />
                <DashboardLayout />
            </div>
        </div>
    );
}