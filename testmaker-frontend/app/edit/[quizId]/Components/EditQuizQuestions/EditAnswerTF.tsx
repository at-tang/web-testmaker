import { useContext } from "react";
import { QuizContext } from "../../page";

export default function EditAnswerTF({i = 0, j = 0}: {i?: number, j?: number}){

    const [quiz, setQuiz] = useContext(QuizContext)
    const answer = quiz.questions[i].answers[j];

    const changeAnswer = (value: boolean) => {
        if (value) {
            quiz.questions[i].answers[0].correct = true
            quiz.questions[i].answers[1].correct = false
        } else {
            quiz.questions[i].answers[0].correct = false
            quiz.questions[i].answers[1].correct = true
        }
        setQuiz({...quiz})
    }

    let trueExtraClasses = "";
    let falseExtraClasses = "";

    if (quiz.questions[i].answers[0].correct === true) {
        trueExtraClasses = " brightness-75 border-green-500  "
        falseExtraClasses = "  "
    } else {
        falseExtraClasses = " brightness-75 border-red-500 "
        trueExtraClasses = "  "


    }

    return(
        <div className="w-full flex items-center justify-center py-1">
            <button
            onClick={() => {changeAnswer(true)}}
            className={trueExtraClasses + " border-4 p-1 w-32 mx-2 hover:cursor-pointer rounded-full bg-white text-black"}>
                True
            </button>

            <button
            onClick={() => {changeAnswer(false)}}
            className={falseExtraClasses + " border-4 p-1 w-32 mx-2 hover:cursor-pointer rounded-full bg-white text-black"}>
                False
            </button>

  
        </div>
    )
}