import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Answer, Question } from "@/app/Types/types";
import { useContext } from "react";
import AnswerMC from "./Answers/AnswerMC";
import AnswerTF from "./Answers/AnswerTF";
import AnswerSI from "./Answers/AnswerSI";

export default function AnswerList() {

    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext<Question>(CurrentQuestionContext);
    
    if (currentQuestion.type == "MC") {
        return (
           <>
            {currentQuestion.answers.map((answer: Answer, index: number) => {
                return (
                    <AnswerMC key={index} i={index}/>
                )

            })}
           </>

        )
    }

    else if (currentQuestion.type == "TF") {
        return (
            <>
                <AnswerTF i={0}/>
            </>
        )
    }

    else if (currentQuestion.type == "SI") {
        return(
            <AnswerSI i={0}/>
            
        )
    }
    if ("" === "") {
        return(
            <div>
        
        Answers: 
            {currentQuestion.answers.map((answer: Answer, index) => {
                return(
                    <p key={index}>{answer.content}</p>
                
                )

            })}
            </div>
        )
    }

}