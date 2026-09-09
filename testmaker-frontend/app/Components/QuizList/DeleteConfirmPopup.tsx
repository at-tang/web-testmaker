"use client"

import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { DisplayQuiz } from "@/app/Types/types"
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"

export default function DeleteComfirmPopup(
    {quiz, condition, setCondition, redirectLink, onDeleted}:
    {
        quiz: DisplayQuiz,
        condition: boolean, // Allows you to alter the variable that enables for this popup's existence
        setCondition: Dispatch<SetStateAction<boolean>>,
        redirectLink: string, // Where the user will be redirected if the deletion works; mainly for deleting quizzes inside their dedicated page
        onDeleted?: (quizId: DisplayQuiz["id"]) => void

    }

) {
    /*
    A popup that appears when you attempt to delete your
    own quiz, asking for confirmation
    */

    const router = useRouter();

    const handleBackgroundClick = (e) => {
        if (e.target == e.currentTarget) {
            setCondition(false);
        }
        
    }

    const handleDeletion = async () => {
        try {
            const session = await getSession();
            if (!session) ErrorReroute(401);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/quiz/delete/` + quiz.id, 
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${session?.idToken}`,
                        "Content-Type": "application/json"                       
                    }
                })
            
            if (!response.ok) ErrorReroute(response.status)
            else {
                onDeleted?.(quiz.id);
                setCondition(false);
                router.push(redirectLink);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>

            <main 
            onClick={(e) => {handleBackgroundClick(e)}}
            className="h-dvh w-dvw bg-black/70 fixed top-0 left-0 z-120 flex items-center justify-center">
                <section className="p-4 border-white rounded-2xl border-2 bg-black max-w-96 sm:max-w-2xl">
                    <h1 className="text-3xl">Confirm</h1>
                    <hr className="mb-2"/>
                    <p className="mb-6">Are you sure you want to delete <b>{quiz.title}</b>? Note that all deletions are <b>permanent.</b></p>

                    <div className="flex justify-center">
                        <button 
                        className="bg-red-600 border-red-600 border-2 rounded-2xl px-4 py-1
                        hover:scale-105 hover:cursor-pointer hover:brightness-90
                        transition ease-in-out"
                        onClick={() => {handleDeletion()}}
                        ><b>DELETE</b>
                        </button>

                        <div className="m-2"/>

                        <button 
                        className="border-2 border-white rounded-2xl px-4 py-1
                        hover:scale-105 hover:cursor-pointer hover:brightness-90
                        transition ease-in-out"
                        onClick={() => {setCondition(false)}}
                        ><b>GO BACK</b>
                        </button>

                    </div>

                </section>

            </main>
        </div>
    )
}