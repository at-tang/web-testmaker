import { useContext } from "react"
import { QuizContext } from "../page"
import { DisplayQuiz } from "@/app/Types/types";
import { getSession } from "next-auth/react";

export default function LikeButton() {

    const [quiz, setQuiz] = useContext<DisplayQuiz>(QuizContext);

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
            setQuiz({...quiz, userLiked: !quiz.userLiked})

        }

        catch (error) {
            console.error(error)
        }

    }

    let colour = " "
    if (quiz.userLiked == false) colour = " bg-gray-500 "
    else colour = " bg-green-500 "


    return(
        <button 
        onClick={() => {likeQuiz()}}
        className={colour + " "}>
            Like

        </button>

    )

}