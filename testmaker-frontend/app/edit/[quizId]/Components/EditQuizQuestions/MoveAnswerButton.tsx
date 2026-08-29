import { useContext, useEffect, useState } from "react"
import { SwapAnswerContext } from "./EditAnswerList"
import { QuizContext } from "../../page"

export default function MoveAnswerButton({i = 0, j = 0}: {i?: number, j?: number}) {
    const [index1, setIndex1] = useContext(SwapAnswerContext) // One of the indexes that will be swapped
    const [quiz, setQuiz] = useContext(QuizContext)
    const [buttonText, setButtonText] = useState("M")

    useEffect(() => {
        if (-1 != index1) {
            setButtonText("V")

        } else {
            setButtonText("M")
        }
    }, [index1])

    const swap = () => {
        if (index1 == -1) {
            setIndex1(j)
        }
        else {
            let quizCopy = {...quiz}
            let swap2 = quizCopy.questions[i].answers[j]
            let swap1 = quizCopy.questions[i].answers[index1]
            quizCopy.questions[i].answers[j] = swap1;
            quizCopy.questions[i].answers[index1] = swap2;
            setIndex1(-1)
            setQuiz(quizCopy)
            
        }
    }

    return(
        <button 
        onClick={() => {swap()}}
        className=" p-2 border-2 ">
            {buttonText}
        </button>
    )
}