import { useContext } from "react";
import { QuizContext } from "../../page";

export default function EditAnswerTF({i = 0, j = 0}: {i?: number, j?: number}){

    const [quiz, setQuiz] = useContext(QuizContext)
    const answer = quiz.questions[i].answers[j];

    const changeAnswer = (value: boolean) => {
        if (value) {
            quiz.questions[i].answers[0].content = true
            quiz.questions[i].answers[1].content = false
        } else {
            quiz.questions[i].answers[0].content = false
            quiz.questions[i].answers[1].content = true
        }
        setQuiz({...quiz})
    }

    let trueExtraClasses = "";
    let falseExtraClasses = "";

    if (quiz.questions[i].answers[0].content == true) {
        trueExtraClasses = " border-green-500 "
        falseExtraClasses = " border-white "
    } else {
        falseExtraClasses = " border-green-500 "
        trueExtraClasses = " border-white "


    }

    return(
        <>
            <button
            onClick={() => {changeAnswer(true)}}
            className={trueExtraClasses + " border-2 p-1"}>
                True
            </button>

            <button
            onClick={() => {changeAnswer(false)}}
            className={falseExtraClasses + " border-2 p-1"}>
                False
            </button>

  
        </>
    )
}