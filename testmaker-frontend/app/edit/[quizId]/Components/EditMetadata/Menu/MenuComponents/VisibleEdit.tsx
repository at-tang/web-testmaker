import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useState } from "react";

export default function VisibleEdit() {
    
    const [quiz, setQuiz] = useContext(QuizContext)
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        if (quiz.visible == false) setButtonText("Private")
        else setButtonText("Public")
    }, [])

    const setVisible = () => {
        setQuiz({...quiz, visible: !(quiz.visible)})

    }

    return (
        <div className="flex items-center mb-2">
            Visibility: 
            <button 
            onClick={() => setVisible()}
            className="text-black bg-white w-24 h-6
                        rounded-full ml-4
                        hover:brightness-75 hover:cursor-pointer"
            >{quiz.visible ? "Public" : "Private"}</button>
        </div>
    )
}