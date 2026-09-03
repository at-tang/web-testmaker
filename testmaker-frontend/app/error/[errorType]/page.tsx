"use client"

import Link from "next/link";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function Error({params}: {params: Promise<{errorType: string}>}) {

    const {errorType} = useParams();

    const errorText = 
    errorType === "unauthorized" ? "The resource you were looking for is private. Perhaps its creator has recently privatized it."
    : errorType === "not-found" ? "The resource you were looking for cannot be found. Perhaps there was a typo?" 
    : errorType === "server-error" ? "Something went wrong with the server. Please check again in a few minutes. WE apologize for the inconvenience." 
    : "There was an error.";



    
    return (
        <div className="h-dvh w-full flex items-center justify-center">
        <div className="flex-col items-center justify-center">
            <p>{errorText}</p>
            <button className="border-2 border-white ">
                <Link href="/home">
                Go to Homepage
                </Link>
            </button>
        </div>
        </div>

    )
}