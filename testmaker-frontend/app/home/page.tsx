"use client"

import { getSession, useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { useEffect } from "react";
import Link from "next/link";

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

        
        <button className="border-2 rounded-lg border-white p-2">
            <Link href="/self/my-quizzes" className="h-full w-full">

            My Quizzes

            </Link>

        </button>
        

        <SignOutButton/>
        </>
    )
}