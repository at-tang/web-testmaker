import { useContext } from "react";
import { QuizContext } from "../../page";

export default function AddAnswerButton({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);


    const addAnswer = () => {
        const newAnswer = {
            content: "",
            correct: false,
            explanation: ""
        }

        let quizCopy = {...quiz}
        quizCopy.questions[i].answers.push(newAnswer);
        setQuiz(quizCopy);

    }

    return(
        <>
            <button 
            onClick={() => addAnswer()}
            className="border-white border-2 p-1">
                Add Answer
            </button>
        </>
    )

}