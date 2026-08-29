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
         let quizCopy = {...quiz}
        if (buttonText == 'Public') {
            quizCopy.visible = false;
            setQuiz(quizCopy)
            setButtonText('Private')
        } else {
            quizCopy.visible = true;
            setQuiz(quizCopy)
            setButtonText('Public')
        }

    }

    return (
        <div className="flex items-center">
            Visibility: 
            <button 
            onClick={() => setVisible()}
            className="text-black bg-white w-24 h-6
                        rounded-full ml-4"
            >{buttonText}</button>
        </div>
    )
}