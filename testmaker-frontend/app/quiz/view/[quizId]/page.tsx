"use client"

import { DisplayQuiz, Quiz } from "@/app/Types/types";
import { getSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import LikeButton from "./Components/LikeButton";
import TagList from "./Components/TagList";
import Link from "next/link";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";

export const QuizContext = createContext<DisplayQuiz>();


export default function ViewQuiz({params}: {params: Promise<{quizId: string}>}) {
    const {quizId} = useParams();

    const router = useRouter();

    const [quiz, setQuiz] = useState<DisplayQuiz>(null);

    useEffect(() => {

        const session = getSession();
        if (!session) return;

        // To save on API calls, the page will save the data of the current quiz
        // being viewed in case the user reloads the page
        let saved = sessionStorage.getItem(`view${quizId}`);
        if (saved != null) {
            let savedJSON = JSON.parse(saved);
            setQuiz(savedJSON);
            return
        }

        
        if (session) {
            const getPrivate = async () => {
                try {
                    const session = await getSession();
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/quiz/get/view/single/${quizId}`,
                        {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${session?.idToken}`,
                                "Content-Type": "application/json"
                            }
                        }
                    )

                    if (!response.ok) {
                        console.log("Rerouting with " + response.status)
                        router.replace(ErrorReroute(response.status))

                    }
                    else {
                        const result = await response.json();
                    console.log(result);
                    setQuiz(result);

                    sessionStorage.setItem(`view${result.id}`, JSON.stringify(result))

                    }


                }
                catch (error) {
                    console.error(error);
                    
                }
            } 
            getPrivate();


        

        }

    }, [])

    useEffect(() => {
        if (quiz != null) sessionStorage.setItem(`view${quiz.id}`, JSON.stringify(quiz))
            console.log(quiz)
    }, [quiz])
        

    if (quiz !== null) return (
        <>
        <QuizContext.Provider value={[quiz, setQuiz]}>

        <div className="p-4">

            <Link href={`/home`}> <button className="">Go Back</button></Link>

            <h1 className="text-4xl mb-1">{quiz.title}</h1>
            <TagList/>
            <p>By: {quiz.ownerName}</p>

            
            <hr className="mb-2"/>

            <p className="mb-8">{quiz.questionCount} Questions | {quiz.totalPoints} Points Availible | {quiz.time} minutes</p>

            <p>{quiz.description}</p>

            <LikeButton/>

            <Link href={`/play/${quiz.id}`}>
            <button className="rounded-full bg-white text-black py-1 px-4 hover:brightness-75 hover:cursor-pointer">Play</button>
            </Link>
        </div>

        </QuizContext.Provider>
        </>
    )

    return (
        <>
            <p>Loading...</p>
        </>
    )

}