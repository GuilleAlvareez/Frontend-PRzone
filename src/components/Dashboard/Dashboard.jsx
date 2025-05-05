import { useState } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export function Dashboard() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
        console.log("SideBar toggled", sideBarOpen);
    }

    return (
        <div className="w-screen h-screen flex">
            <NavBar sideBarOpen={sideBarOpen}/>
            <Header sideBarOpen={sideBarOpen} toggleSideBar={toggleSideBar}/>
        </div>
    )
}