"use client"

import { DisplayQuiz, Quiz } from "@/app/Types/types";
import { getSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import LikeButton from "./Components/LikeButton";
import TagList from "./Components/TagList";
import Link from "next/link";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import BackButton from "@/app/Components/Buttons/BackButton";
import LikeButtonGrid from "@/app/Components/QuizList/LikeButton";

export const QuizContext = createContext<DisplayQuiz>();


export default function ViewQuiz({params}: {params: Promise<{quizId: string}>}) {
    const {quizId} = useParams();

    const router = useRouter();

    const [quiz, setQuiz] = useState<DisplayQuiz>(null);

    useEffect(() => {

        const session = getSession();
        if (!session) return;


        
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
        

    if (quiz !== null) return (
        <>
        <QuizContext.Provider value={[quiz, setQuiz]}>

        <div className="p-4 w-full">

            <BackButton/>
            <div className="mb-4"/>

            <h1 className="text-4xl">{quiz.title}</h1>
            <p className="mb-3">By: {quiz.ownerName}</p>
            <TagList/>
            

            
            <div className="w-full h-0.5 bg-white my-4"/>

            <p className="mb-8">{quiz.questionCount} Questions | {quiz.totalPoints} Points Availible | {quiz.time} minutes</p>

            <p className="mb-4">{quiz.description}</p>

            <p> Created: {new Date(quiz.dateCreated * 1000).toDateString()}</p>
            <p>Last Updated: {new Date(quiz.dateUpdated * 1000).toDateString()}</p>

            <div className="w-full h-0.5 bg-white my-4"/>

            <menu className="mb-4">
                <LikeButtonGrid quiz={quiz}/>

            </menu>

            

            <Link href={`/play/${quiz.id}`}>
            <button className="rounded-full bg-white text-black py-1 px-4 hover:brightness-75 hover:cursor-pointer w-full">Play</button>
            </Link>

            {quiz.ownQuiz && 
            <Link href={`/play/${quiz.id}`}>
                <button className="rounded-full bg-white text-black py-1 px-4 hover:brightness-75 hover:cursor-pointer w-full">Edit</button>
            </Link>        
            }



            
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