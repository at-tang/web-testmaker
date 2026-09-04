import { useContext } from "react"
import { QuizContext } from "../../page"

export default function RemoveAnswerButton({i = 0, j = 0}: {i?: number, j?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);

    const deleteQuestion = () => {
        let quizCopy = {...quiz}
        quizCopy.questions[i].answers.splice(j, 1)
        setQuiz(quizCopy)
        
    }

    return(
        <>
            <button 
            onClick={() => deleteQuestion()}
            className="border-white rounded-full bg-white hover:brightness-75 hover:cursor-pointer text-black w-8 h-8 ml-2">
                X
            </button>
        </>

    )

}