import { QuizContext } from "@/app/edit/[quizId]/page";
import { CurrentQuestionContext, CurrentQuestionIndexContext, GivenAnswersContext, QuestionListContext } from "@/app/play/[quizId]/page";
import { GivenAnswer, Question, Quiz, Answer } from "@/app/Types/types";
import { createContext, useContext, useEffect, useState } from "react";
import AnswerList from "./Components/AnswerList";

export const QuestionContext = createContext();

export default function QuestionDisplay() {
    /*
    Displays the current question
    */

    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);


   

    useEffect(() => {
        if (questionList == null) return

        
    }, [questionList])



    if (currentQuestion != null) return (

        <div>
            <p>Question {currentQuestionIndex + 1}</p>
            <p>{currentQuestion.description}</p>
            <p>Worth {currentQuestion.points} point{`(s)`}</p>

            <AnswerList/>

        </div>
        
    )
    else {
        return (<><p>Loading...</p></>)
    }



}