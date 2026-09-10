"use client"
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function Popup({children, condition, setCondition}:
    {
        condition: boolean,
        setCondition: Dispatch<SetStateAction<boolean>>,
        children: ReactNode

    }
) {

    const handleBackgroundClick = (e) => {
        if (e.target == e.currentTarget) {
            setCondition(false);
        }
        
    }


    if (condition) return (
        <main
        onClick={(e) => {handleBackgroundClick(e)}}
         className="h-dvh w-dvw bg-black/70 fixed top-0 left-0 z-120 flex items-center justify-center">
            <section className="p-4 border-white rounded-2xl border-2 bg-black max-w-96 sm:max-w-2xl min-w-1/2">
                <div className="flex justify-end">
                    <button 
                    onClick={() => {setCondition(false)}}
                    className="border-2 border-white h-8 w-8 flex items-center justify-center hover:bg-white hover:text-black hover:cursor-pointer rounded-full transition ease-in-out font-bold hover:scale-105">
                        X
                    </button>
                </div>


                {children}


            </section>

        </main>

    )
}