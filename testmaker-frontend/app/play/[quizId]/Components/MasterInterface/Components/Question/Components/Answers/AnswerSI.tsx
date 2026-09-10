import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Question } from "@/app/Types/types";
import { useContext, useRef } from "react";

export default function AnswerSI({i = 0}: {i?: number}) {
    const [givenAnswers, setGivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);

    const inputRef = useRef(null);

    return(
        <>
        <div>
            <input 
            ref={inputRef}
            placeholder="Enter your answer here..."
            value={givenAnswers[currentQuestionIndex].givenAnswers[0] || ""}
            onChange={(e) => {
                let givenAnswersCopy = [...givenAnswers]
                givenAnswersCopy[currentQuestionIndex].givenAnswers = [e.target.value]
                setGivenAnswers(givenAnswersCopy)
            }}
            className="rounded-full border-white p-1 border-2 w-full px-4"
            ></input>
        </div>
        </>
    )
}