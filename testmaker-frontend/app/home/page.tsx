"use client"

import { getSession, useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        const sessionTesting = async () => {
            const session = await getSession();
            console.log(session);
        }
        sessionTesting();
        
    }, [])

    
    return (
        <>
        <h1>
            this is the home page!
        </h1>

        <SignOutButton/>
        </>
    )
}