import { DisplayQuiz } from "@/app/Types/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Quiz({quiz}: {quiz: DisplayQuiz}) {

    const handleNonButtonClick = (e) => {
        /*
        Handles all clicks to the object that isn't directly
        correlated with another buttom (like Play or Edit)
        */

        if (e.target === e.currentTarget) {
            redirect(`/quiz/view/${quiz.id}`)
        }
    }

    return (
        <>
            <div
            onClick={(e) => {handleNonButtonClick(e)}} 
             className="bg-black mb-2 border-white border-2 p-2 hover:cursor-pointer" >
                    {quiz.title}


                    <Link href={`/play/${quiz.id}`}>
                        <button className="border-2 border-white p-2 m-2">Play</button>
                    </Link>

                    {quiz.ownQuiz && 
                    <Link href={`/edit/${quiz.id}`}>
                        <button className="border-2 border-white p-2 m-2">
                            Edit
                        </button>
                    </Link>}
            </div>
        </>
    )

}