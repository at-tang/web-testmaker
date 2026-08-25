"use client"
import { login } from "../api/auth/[...nextauth]/authServerFunctions";

export default function SigninButton() {
    return(
    <>
        <button onClick={() => login()} className="px-4 py-2 border-white border-2 rounded-lg hover:cursor-pointer">
            <p>Login</p>

        </button>
    </>
    )
}