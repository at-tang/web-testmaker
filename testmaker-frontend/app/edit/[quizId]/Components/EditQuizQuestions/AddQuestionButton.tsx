import { useContext } from "react";
import { QuizContext } from "../../page";

export default function AddQuestionButton({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);

    const addQuestion = () => {
        let quizCopy = {...quiz}
        let newQuestion = {
            title: "",
            description: "",
            explanation: "",
            points: 1,
            type: "MC",
            caseSensitive: false,
            answers: [
                {
                    content: "",
                    correct: false,
                    explanation: ""
                }
            ]
        }
        quizCopy.questions.splice(i, 0, newQuestion);

        setQuiz(quizCopy);

    }


    

    return (
        <>
            <button 
            onClick={() => addQuestion()}
            className="text-black bg-white rounded-full border-2 p-1 w-full my-4 hover:cursor-pointer hover:brightness-75">
                Add Question
            </button>

        </>
    )
}