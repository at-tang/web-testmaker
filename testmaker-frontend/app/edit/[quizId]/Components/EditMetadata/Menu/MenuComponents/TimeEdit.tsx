import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useRef, useState } from "react";

export default function TimeEdit() {
    const [quiz, setQuiz] = useContext(QuizContext)
    const [border, setBorder] = useState(" border-white ");
    const ref = useRef(null)

    return (
        <div className="flex my-2 items-center mb-4">
            
            Time: 

            <input type="number"

            ref={ref}

            min={1} // Minimum number of minutes 

            max={120} // Maximum number of minutes

            defaultValue={quiz.time}

            onChange={() => {
                if (ref.current.value < 1 || ref.current.value > 120) {
                    setBorder(" border-red-500 ")
                } else {
                    setBorder(" border-white ")
                }
                let quizCopy = {...quiz}
                quizCopy.time = Number(ref.current.value);
                setQuiz(quizCopy)

            }}
            className={border + " px-1 py-0.5 mx-4 border-2 "}></input>

            Minutes
    
        </div>
    )
}