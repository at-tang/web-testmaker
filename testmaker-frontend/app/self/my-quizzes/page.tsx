"use client"

import QuizList from "@/app/Components/QuizList/QuizList";
import SigninButton from "@/app/login/SignInButton";
import { DisplayQuiz } from "@/app/Types/types";
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react";

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
        <div>
            <h1>My Quizzes</h1>
            <hr/>
            <QuizList quizList={quizzes}/>
            
        </div>
    )

}
