import { redirect } from "next/navigation";
import { Links } from "./Toolbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ToolbarButton({info}: {info: Links}) {

    const handleClick = () => {
        redirect(info.redirectLink)
    }

    const [mouseHover, setMouseHover] = useState(false);

    useEffect(() => {
        console.log("Mouse is hovering: " + mouseHover)

    }, [mouseHover])

    return (
        <>
        <div className=" flex justify-center">
            <button className="p-2 rounded-full flex items-center justify-center mb-4 hover:cursor-pointer hover:bg-gray-800 transition ease-in-out "
            onClick={() => {handleClick()}}
            onMouseEnter={() => {setMouseHover(true)}}
            onMouseLeave={() => {setMouseHover(false)}}
            >
        
                <Image 
                className="w-7 block "
                src={`${info.iconLink}`}
                width={40} 
                height={40}
                alt="Search Icon"/>
        
                </button>

                {mouseHover && <div className="bg-black p-2 rounded-xl absolute left-15 translate-y-1 transition shadow-xl/50">{info.hoverText}</div>}

            
        </div>

        
        </>
    )

}