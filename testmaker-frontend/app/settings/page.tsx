"use client"

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateDisplayName from "./Options/UpdateDisplayName";
import { ErrorReroute } from "../api/ErrorPageRereouting/ErrorRerouting";
import { UserDetails } from "../Types/types";
import LoginLogoutButton from "../Components/Buttons/LoginLogoutButton";

export default function Settings() {

    const [newUsername, setNewUsername] = useState("");
    const [userDetails, setUserDetails] = useState<UserDetails>(new UserDetails("", "", ""));
    const router = useRouter();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const session = await getSession();
                if (!session) router.replace("/login")

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/user/get`, 
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session.idToken}`,
                            "Content-Type": "application/json"                  
                        }

                    }
                )

                if (!response.ok) ErrorReroute(response.status);

                const result = await response.json();

                setUserDetails(result);

                    
            } catch (error) {
                console.error(error);
            }
        }
        getUserDetails();

    }, [])

    if (userDetails.displayName.length === 0) {
        return (
            <>
            </>
        )
    }

    return (

        <main className="p-4">

            <header>
                <h1 className="text-2xl mb-1 sm:text-3xl">Settings</h1>
                <hr className="mb-4"/>

                <div className="mb-2">Currently logged in as: <b className="">{userDetails.email}</b></div>
                <p className="mb-6">Your User ID: <b>{userDetails.id}</b></p>
            </header>

            <UpdateDisplayName currentName={userDetails.displayName}/>

            <div className="flex justify-center w-full mt-12">
                <LoginLogoutButton/>
            </div>

            

        </main>
    )
}