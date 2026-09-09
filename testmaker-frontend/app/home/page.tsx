"use client"

import { getSession, useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import SigninButton from "../login/SignInButton";
import LoginLogoutButton from "../Components/Buttons/LoginLogoutButton";

export default function Home() {

    const [sessionActive, setSessionActive] = useState(false);

    

    useEffect(() => {
        const sessionTesting = async () => {
            const session = await getSession();
            console.log(session);

            if (session) setSessionActive(true)
            else setSessionActive(false)
        
        }
        sessionTesting();
        
    }, [])

    
    if (sessionActive) return (
        <>
        <h1>
            this is the home page!
        </h1>

        
        <button className="border-2 rounded-lg border-white p-2">
            <Link href="/self/my-quizzes" className="h-full w-full">

            My Quizzes

            </Link>

        </button>
        

        <LoginLogoutButton/>
        </>
    )

    return (
        <>
            <SigninButton/>
        </>
    )
}