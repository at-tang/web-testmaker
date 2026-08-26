import { useContext } from "react";
import { QuizContext } from "../../page"
import EditAnswerMC from "./EditAnswerMC";
import AddAnswerButton from "./AddAnswerButton";
import EditAnswerTF from "./EditAnswerTF";

export default function EditAnswersList({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);
    const question = quiz.questions[i];
    const answers = quiz.questions[i].answers;

    if (question.type == "TF") {
        return (
            <>
                <EditAnswerTF i={i}/>
            </>
        )
    }

    return (
        <div>
            <p>{}</p>
            {answers.map((answer, j) => {
                return (
                        <div key={j}>
                            <EditAnswerMC i={i} j={j}/>
                        </div>
                )
            }) }
           
        </div>
    )
}