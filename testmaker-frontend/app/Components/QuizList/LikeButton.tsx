import { DisplayQuiz } from "@/app/Types/types";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LikeButtonGrid({quiz}: {quiz: DisplayQuiz}) {

    const [quizLiked, setQuizLiked] = useState(quiz.userLiked);
    const [likeCount, setLikeCount] = useState(quiz.likes)
    const heartLink = quizLiked ? "/full_heart.svg" : "/heart.svg";

    const likeQuiz = async () => {
            const session = await getSession();
            if (!session) return;
    
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/like/add/${quiz.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${session?.idToken}`,
                        "Content-Type": "application/json"
                        }
                    }
                )
    
                if (!response.ok) throw new Error();
    
                setQuizLiked((prev) => (!prev))
                setLikeCount((prev) => (quizLiked ? prev - 1 : prev + 1))

    
            }
    
            catch (error) {
                console.error(error)
            }
    
    }
    return (
        <>
            <div>
                <button 
                onClick={() => {likeQuiz()}}
                className={ "border-2  py-1 rounded-2xl flex w-24 justify-center items-center hover:cursor-pointer hover:scale-105 transition ease-in-out"}
                           >


                    <Image className="block mr-2" src={heartLink} height={16} width={16} alt="H"/>

                    <div className="items-center justify-center">
                        {likeCount > 9999 ? `${Math.floor(likeCount / 10000)}K` : `${likeCount}`}
                    </div>
                    
                </button>
                
            </div>
        </>

    )
}