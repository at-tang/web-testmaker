import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Question } from "@/app/Types/types";
import { useContext, useRef } from "react";

export default function AnswerSI({i = 0}: {i?: number}) {
    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setGivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext<Question>(CurrentQuestionContext);

    const inputRef = useRef(null);

    return(
        <>
        <div>
            <input 
            ref={inputRef}
            value={givenAnswers[currentQuestionIndex].givenAnswers[0] || ""}
            onChange={(e) => {
                let givenAnswersCopy = [...givenAnswers]
                givenAnswersCopy[currentQuestionIndex].givenAnswers = [e.target.value]
                setGivenAnswers(givenAnswersCopy)
            }}
            ></input>
        </div>
        </>
    )
}