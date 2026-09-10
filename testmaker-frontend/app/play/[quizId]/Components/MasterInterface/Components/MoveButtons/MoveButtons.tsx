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
        <div className="flex gap-2">
            <button onClick={() => {
                if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
            }}
            className="h-8 w-16 border-white border-2 rounded-2xl text-2xl">   
                <div className="w-full flex justify-center items-center h-full">
                    <p>{"<"}</p>
                </div>         
                
            </button>

            <button onClick={() => {
                if (currentQuestionIndex < questionList.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
            className="h-8 w-16 border-white border-2 rounded-2xl text-2xl hover:text-black hover:bg-white hover:cursor-select">
                <div className="w-full flex justify-center items-center h-full">
                    <p>{">"}</p>
                </div>  
            </button>
    
        </div>
    )

}