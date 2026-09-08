"use client"

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { login, logout } from "@/app/api/auth/[...nextauth]/authServerFunctions";
import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function LoginLogoutButton() {
    const [sessionActive, setSessionActive] = useState(false)
    const session  = getSession();


    const handleClick = async () => {

        const session = await getSession();

        if (!session) {
            setSessionActive(false)
            login();
        }
        else {
            setSessionActive(true)
            logout();
        }

    }

    useEffect(() => {
        const check = async () => {
            const session = await getSession();
            console.log(session)

            if (!session) setSessionActive(false);
            else setSessionActive(true);

        }
        check();


    }, [])

    return (
        <div>
            <button 
            onClick={() => {handleClick()}}
            className="px-4 py-1 border-2 border-white rounded-2xl">
                {sessionActive === false ? "Sign In / Sign Up" : "Logout"}
            </button>
        </div>
    )
}