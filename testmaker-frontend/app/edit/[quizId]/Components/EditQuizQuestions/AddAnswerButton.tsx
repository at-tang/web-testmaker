import { useContext } from "react";
import { QuizContext } from "../../page";

export default function AddAnswerButton({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);


    const addAnswer = () => {
        let newAnswer;
        if (quiz.questions[i].type == "MC") {
            newAnswer = {
                content: "",
                correct: false,
                explanation: ""
            }
        }

        else if (quiz.questions[i].type == "SI") {
            newAnswer = {
                content: "",
                correct: true,
                explanation: ""
            }
        }

        let quizCopy = {...quiz}
        quizCopy.questions[i].answers.push(newAnswer);
        setQuiz(quizCopy);

    }

    if (quiz.questions[i].answers.length < 5) return(
        <div className="flex justify-center w-full mt-2">
            <button 
            onClick={() => addAnswer()}
            className="py-2 px-4 bg-white text-black rounded-full border-2 hover:brightness-75 hover:cursor-pointer mt-4">
                Add Answer
            </button>
        </div>
    )

}