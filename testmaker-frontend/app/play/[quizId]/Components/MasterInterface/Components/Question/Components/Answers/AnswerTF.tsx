import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Question } from "@/app/Types/types";
import { useContext } from "react";

export default function AnswerTF({i = 0}: {i?: number}) {
    const [givenAnswers, setGivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);

    const changeAnswer = (value: boolean) => {
        let givenAnswersCopy = [...givenAnswers]
        if (value) {
            givenAnswersCopy[currentQuestionIndex].givenAnswers = ["True"]
        } else {
            givenAnswersCopy[currentQuestionIndex].givenAnswers = ["False"]
        }
        setGivenAnswers(givenAnswersCopy)
    }

    let trueClasses = "";
    let falseClasses = "";
    
    if (givenAnswers[currentQuestionIndex].givenAnswers[0] == "True") {
        trueClasses = "bg-green-600";
    } else if (givenAnswers[currentQuestionIndex].givenAnswers[0] == "False") {
        falseClasses = "bg-red-500";
    }

    return(
        <div>
            <div className="flex justify-center gap-2">
                <button onClick={() => {changeAnswer(true)}} className={trueClasses + " border-2 border-white py-1.5 w-36 rounded-full"}>
                    True
                </button>

                <button onClick={() => {changeAnswer(false)}} className={falseClasses + " border-2 border-white py-1.5 w-36 rounded-full"}>
                    False
                </button>

            </div>





        </div>
    )
}