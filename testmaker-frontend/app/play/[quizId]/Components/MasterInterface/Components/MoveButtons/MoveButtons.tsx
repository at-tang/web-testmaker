import { CurrentQuestionIndexContext, GivenAnswersContext, QuestionListContext } from "@/app/play/[quizId]/page";
import { useContext } from "react";

export default function MoveButtons() {
    /*
    Buttons that allow the user to move between questions of a quiz
    */

    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);

    return(
        <div>
            <button onClick={() => {
                if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
            }}
            className="h-8 w-12 border-white border-2 mr-4">
                {"<"}
            </button>

            <button onClick={() => {
                if (currentQuestionIndex < questionList.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="h-8 w-12 border-white border-2">
                {">"}
            </button>
    
        </div>
    )

}