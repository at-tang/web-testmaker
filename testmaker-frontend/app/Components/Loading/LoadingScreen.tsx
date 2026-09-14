import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {

    return (
        <>
            <div className="w-full h-dvh flex items-center justify-center">
                <div>
                    <Image src="/magnifyingGlass.svg" height={48} width={48} alt="Loading..."
                    className=" animate-bounce w-16 sm:w-24 md:w-36"/>

                    <p className="mt-8 text-xl">Loading...</p>
                </div>


            </div>
        </>
    )
}