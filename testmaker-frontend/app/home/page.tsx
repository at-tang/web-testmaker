"use client"

import { getSession, useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import SigninButton from "../login/SignInButton";
import LoginLogoutButton from "../Components/Buttons/LoginLogoutButton";
import { useRouter } from "next/navigation";
import TextButton from "../Components/Buttons/TextButton";
import QuizSwimLane from "../Components/QuizList/QuizSwimLane";

export default function Home() {

    const [sessionActive, setSessionActive] = useState(false);
    const router = useRouter();

    

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
        <div className="p-4">
        <h1>
            this is the home page!
        </h1>

        <TextButton text="My Quizzes" clickFunction={() => {router.push("/self/my-quizzes")}}/>



        <LoginLogoutButton/>

        <div className="mb-8"/>


        <section className="mb-8">
            <h1 className="text-4xl sm:text-5xl mb-1 sm:text-left text-center">Featured</h1>
            <div className="mb-4 bg-white w-full h-0.5"/>

            <div className=""><QuizSwimLane/></div>
        </section>

        <section className="mb-8">
            <h1 className="text-4xl sm:text-5xl mb-1 sm:text-left text-center">Your Quizzes</h1>
            <div className="mb-4 bg-white w-full h-0.5"/>

            <div className=""><QuizSwimLane/></div>
        </section>

        <section className="">
            <h1 className="text-4xl sm:text-5xl mb-1 sm:text-left text-center">Top Quizzes</h1>
            <div className="mb-4 bg-white w-full h-0.5"/>

            <div className=""><QuizSwimLane/></div>
        </section>



        </div>
    )

    return (
        <>
            <SigninButton/>
        </>
    )
}