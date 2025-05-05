import { useContext } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { DashboardLayout } from "./DashboardLayout";
import { SidebarContext } from "../../context/SideBarContext";

export function Dashboard() {
    const { sideBarOpen } = useContext(SidebarContext);

    return (
        <div className="w-screen h-screen flex">
            <NavBar />

            <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? 'ml-64' : 'ml-0'}`}>
                <Header />
                <DashboardLayout />
            </div>
        </div>
    )
}