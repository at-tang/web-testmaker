import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useRef } from "react";

export default function TimeEdit() {
    const [quiz, setQuiz] = useContext(QuizContext)
    const ref = useRef(null)

    return (
        <div className="flex my-2">
            
            Time: 

            <input type="number"

            ref={ref}

            min="1" // Minimum number of minutes 

            max="120" // Maximum number of minutes

            defaultValue={quiz.time}

            onChange={() => {
                let quizCopy = {...quiz}
                quizCopy.time = Number(ref.current.value);
                setQuiz(quizCopy)

            }}
            className="bg-white text-black mx-4"></input>

            Minutes
    
        </div>
    )
}