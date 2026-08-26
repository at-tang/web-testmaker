import { useContext } from "react";
import { QuizContext } from "../../page";

export default function AddQuestionButton() {

    const [quiz, setQuiz] = useContext(QuizContext);

    const addQuestion = () => {
        let quizCopy = {...quiz}
        let newQuestion = {
            title: "",
            description: "",
            explanation: "",
            points: 1,
            type: "MC",
            answers: []
        }
        quizCopy.questions.push(newQuestion);
        setQuiz(quizCopy);

    }


    

    return (
        <>
            <button 
            onClick={() => addQuestion()}
            className="border-white border-2 p-1 w-full">
                Add Question
            </button>

        </>
    )
}