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

        <div className="">
            <h1 className="text-2xl sm:text-3xl mb-1">Question {currentQuestionIndex + 1}</h1>
            <div className="h-[1px] bg-white w-full mb-3"/>

            <p>Worth {currentQuestion.points} point{`(s)`}</p>
            <p className="mb-4">{currentQuestion.description}</p>
            

            <AnswerList/>

            <div className="bg-white h-[1px] mt-3 w-full"/>

        </div>
        
    )
    else {
        return (<><p>Loading...</p></>)
    }



}