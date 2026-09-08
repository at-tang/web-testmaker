"use client"
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";

export default function Searchbar(
    {
        valueChanged,
        setValueChanged,
        placeholder,
        redirectLink
    }:
    {
        valueChanged: string
        setValueChanged: Dispatch<SetStateAction<string>>
        placeholder: string
        redirectLink: string
    }
    ) 
        {

        const router = useRouter();
        const inputRef = useRef<HTMLInputElement>(null);
    
    
    
    
        const handleEnterClick = () => {
            if (inputRef.current) setValueChanged(inputRef.current.value)
        }
    
        return (
            <div className="border-white h-10 border-2 rounded-2xl flex items-center">
                <Image className="w-6 mr-4 ml-4" src="/magnifyingGlass.svg" width={5} height={5} alt=""/>
                <input 
                ref={inputRef}
                placeholder={placeholder}
                maxLength={60}
                defaultValue={valueChanged}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleEnterClick();
                }}
                className="w-full select-none sm:text-xl text-md"
                >
                    
    
                </input>
    
                <button type="button" onClick={handleEnterClick} className="h-full border-l-2 border-white rounded-2xl rounded-r-xl sm:px-12 px-6 hover:bg-white hover:text-black transition ease-in-out hover:cursor-pointer">Enter</button>
            </div>
        )
    }

