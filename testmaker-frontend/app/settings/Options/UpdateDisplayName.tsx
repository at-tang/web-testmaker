"use client"

import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function UpdateDisplayName(
    {currentName}:
    {
        currentName: string
    }
) {

    const [newDisplayName, setNewDisplayName] = useState(currentName);
    const [errorText, setErrorText] = useState("");

    const handleClick = async () => {
        if (newDisplayName.length < 8 || newDisplayName.length > 20) {
            setErrorText("Username must be 8-20 characters long.")
            return;
        }
        let test: boolean = /^(?=[0-9_]*[A-Za-z])[A-Za-z0-9_]+$/.test(newDisplayName)
        if (!test) {
            setErrorText("Your new username must contain at least one letter. Your username can also ONLY consist of alphanumerical characters and \"_\"");
            return;
        }


        else {
            try {
                const session = await getSession();
                if (!session) {ErrorReroute(401); return}
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/user/update/display_name?new_display_name=${newDisplayName}`,
                    {
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${session.idToken}`,
                            "Content-Type": "application/json"                            
                        }
                    }
                )

                if (!response.ok) {
                    setErrorText(`User with Display Name: ${newDisplayName} already exists. Please select another.`)
                    return;
                }

                else {
                    setErrorText("Username change successful!")
                    return;
                }


            } catch (error) {
                console.error(error);
            }
        }

    }

    return (
            <section className="">
                <div className="sm:flex sm:items-center text-center overflow-x-auto scrollbar-none">
                    <p className="">Change Username {"(Must be unique)"}:</p>

                    <input
                    placeholder="Insert your new username"
                    min={0}
                    max={45}
                    value={newDisplayName}
                    onChange={(e) => {setNewDisplayName(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleClick();
                    }}
                    className="mx-4 rounded-2xl border-2 border-white p-1"
                    required={true}
                    ></input>

                    <button 
                    className="border-2 border-white rounded-2xl p-1 hover:bg-white hover:text-black hover:cursor-pointer hover:scale-105 transition ease-in-out"
                    onClick={() => {handleClick()}}>Submit</button>
                </div>

                <div className="block">
                    <p className="text-red-500">{errorText !== "Username change successful!" ? errorText : ""}</p>
                    <p className="bg-green-500">{errorText === "Username change successful!" ? errorText : ""}</p>
                </div>

                
            </section>
    )
}