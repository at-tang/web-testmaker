"use client"

import { createContext, useEffect, useState } from "react";
import MainMenu from "./MainMenu";

export const MenuVisibleContext = createContext();

export default function MenuButton() {

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuText, setMenuText] = useState("Menu");

    useEffect(() => {
        if (menuVisible) setMenuText("Close")
        else setMenuText("Menu")
    }, [menuVisible])
    return (
        <>
            <MenuVisibleContext.Provider value={[menuVisible, setMenuVisible]}>


            <div
            onClick={() => {setMenuVisible(!menuVisible)}} 
            className="bg-white text-black fixed p-2 right-0 hover:brightness-75 hover:cursor-pointer select-none rounded-l-2xl top-2 z-30">
                {menuText}

            </div>

            {menuVisible && <MainMenu/>}

            </MenuVisibleContext.Provider>
        </>
    )
}