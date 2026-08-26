import { useContext } from "react"
import { QuizContext } from "../../page"

export default function RemoveAnswerButton({i = 0, j = 0}: {i?: number, j?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);

    const deleteQuestion = () => {
        
    }

    return(
        <>
            <button 
            onClick={() => deleteQuestion()}
            className="border-white p-2 border-2">
                X
            </button>
        </>

    )

}