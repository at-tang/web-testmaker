import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useState } from "react";

export default function RandomQuestionOrderEdit() {
    
    const [quiz, setQuiz] = useContext(QuizContext)
    const [buttonText, setButtonText] = useState("");


    const setVisible = () => {
        let quizCopy = {...quiz}
        quizCopy.randomQuestionOrder = !quiz.randomQuestionOrder;
        setQuiz({...quiz, randomQuestionOrder: !quiz.randomQuestionOrder})
        

    }

    return (
        <div className="flex items-center mb-2">
            Question Order: 
            <button 
            onClick={() => setVisible()}
            className="text-black bg-white w-24 h-6
                        rounded-full ml-4
                        hover:brightness-75 hover:cursor-pointer"
            >{quiz.randomQuestionOrder ? "Random" : "Fixed"}</button>
        </div>
    )
}