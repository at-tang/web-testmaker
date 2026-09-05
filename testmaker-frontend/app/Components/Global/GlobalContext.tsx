"use client"

import { getSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface GlobalState {
    popupOpen: boolean,

    sessionActive: boolean,

    openPopup: () => void,
    closePopup: () => void,
    checkForSession: () => void,


}

export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({children}: {children: ReactNode}) {
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [sessionActive, setSessionActive] = useState(false);

    useEffect(() => {
        checkForSession();
    }, [])

    const checkForSession = async () => {

        const session = getSession();
        if (!session) {
            setSessionActive(false)
        } else {
            setSessionActive(true)
        }
    }

    const openPopup = (page: string) => {
        setPopupOpen(true)
    }

    const closePopup = () => {
        setPopupOpen(false)
    }
    return (
        <GlobalStateContext.Provider value={{popupOpen, sessionActive, openPopup, closePopup, checkForSession}}>
            {children}
        </GlobalStateContext.Provider>

    )
    
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    return context;
}

