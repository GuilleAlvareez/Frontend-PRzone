import { createContext, useState } from "react";

// 1. Crear el contexto
export const SidebarContext = createContext();

// 2. Crear el proveedor
export function SidebarProvider({ children }) {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    };

    return (
        <SidebarContext.Provider value={{ sideBarOpen, toggleSideBar }}>
            {children}
        </SidebarContext.Provider>
    );
}
