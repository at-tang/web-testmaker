"use client"

import QuizList from "@/app/Components/QuizList/QuizList";
import SigninButton from "@/app/login/SignInButton";
import { DisplayQuiz } from "@/app/Types/types";
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyQuizzesPage() {
    const [sessionActive, setSessionActive] = useState(false)
    const [quizzes, setQuizzes] = useState<Array<DisplayQuiz>>([]);



    useEffect(() => {
            const getData = async () => {
                try {
                const session = await getSession();

                if (session) setSessionActive(true)
                if (!session) setSessionActive(false) 

                if (session) {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/quiz/get/view/list/myquizzes`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session.idToken}`,
                            "Content-Type": "application/json"
                        }
                    })

                    if (!res.ok) throw new Error(`${res.status}`);
                    const result = await res.json();
                    setQuizzes(result);
                    console.log(quizzes);


                }

                } 
                catch (error) {
                    console.error(error)
                }
            }
        getData(); 
    }, [])

    useEffect(() => {
        console.log(quizzes)
    }, [quizzes])

    if (!sessionActive) return (
        <div>
            <div>
                Not signed in!
                <SigninButton/>
            </div>


        </div>
    )

    return (
        <div className="h-full flex flex-col">

            <header className="flex-none px-4 pt-4">
                <h1 className="text-5xl mb-2 pt-2 text-center">My Quizzes</h1>
                 <div className="h-0.5 w-full bg-white"/>

            </header>

            <menu className="h-20 w-full flex-none flex items-center justify-center">
                <Link href="/edit/newquiz">
                <button className="border-2 border-white p-2 rounded-2xl w-64 flex items-center justify-center
                transition ease-in-out hover:scale-105 hover:cursor-pointer">
                    
                    <Image className="w-5 mr-3" src="/add.svg" width={4} height={4} alt=""/>
                    <p className="text-lg">Create New Quiz</p>
                
                </button>
                </Link>

            </menu>

            <main className="w-full min-h-32 flex-1">
                <QuizList quizList={quizzes}/>

            </main>

            
            
           

            
            
        </div>
    )

}
