import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Question } from "@/app/Types/types";
import { useContext } from "react";

export default function AnswerTF({i = 0}: {i?: number}) {
    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setGivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext<Question>(CurrentQuestionContext); 

    const changeAnswer = (value: boolean) => {
        let givenAnswersCopy = [...givenAnswers]
        if (value) {
            givenAnswersCopy[currentQuestionIndex].givenAnswers = ["true"]
        } else {
            givenAnswersCopy[currentQuestionIndex].givenAnswers = ["false"]
        }
        setGivenAnswers(givenAnswersCopy)
    }

    let trueClasses = "";
    let falseClasses = "";
    
    if (givenAnswers[currentQuestionIndex].givenAnswers[0] == "true") {
        trueClasses = "bg-green-500";
    } else if (givenAnswers[currentQuestionIndex].givenAnswers[0] == "false") {
        falseClasses = "bg-red-500";
    }

    return(
        <div>
            <button onClick={() => {changeAnswer(true)}} className={trueClasses}>
                True
            </button>

            <button onClick={() => {changeAnswer(false)}} className={falseClasses}>
                False
            </button>

        </div>
    )
}