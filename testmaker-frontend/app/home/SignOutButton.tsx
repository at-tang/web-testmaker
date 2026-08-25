"use client"
import { logout } from "../api/auth/[...nextauth]/authServerFunctions";

export default function SignOutButton() {
    return(
    <>
        <button onClick={() => logout()} className="px-4 py-2 border-white border-2 rounded-lg hover:cursor-pointer">
            <p>Logout</p>

        </button>
    </>
    )
}