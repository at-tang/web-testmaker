"use client"
import { useContext, useState } from "react";
import { GlobalStateContext, GlobalStateProvider } from "../Global/GlobalContext";

export default function Popup() {

    const {popupOpen, closePopup} = useContext(GlobalStateContext);


    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    }
    if (popupOpen) return (
        <div className="fixed left-0">

            


            <div 
            onClick={(e) => handleBackgroundClick(e)}
            className="bg-black/50 h-dvh w-dvw z-98 fixed flex items-center justify-center">
             
                <div className="bg-white w-16 h-16 z-99">

                </div>
            </div>

            
        </div>
    )
}