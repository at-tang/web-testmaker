import { useContext } from "react";
import { QuizContext } from "../../page"
import EditAnswerMC from "./EditAnswerMC";
import AddAnswerButton from "./AddAnswerButton";
import EditAnswerTF from "./EditAnswerTF";
import EditAnswerSI from "./EditAnswerSI";

export default function EditAnswersList({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);
    const question = quiz.questions[i];
    const answers = quiz.questions[i].answers;

    // Answer Format for True/False Questions

    if (question.type == "TF") {
        return (
            <>
                <EditAnswerTF i={i}/>
            </>
        )
    }


    // Answer Format for Short Input Questions

    if (question.type == "SI") {// If question type is Short Input
        return (
            <div>
            <p>Questions are CASE-SENSITIVE</p>
            {answers.map((answer, j) => {
                return (
                        <div key={j}>
                            <EditAnswerSI i={i} j={j}/>
                        </div>
                )
            }) }
           
        </div>
        )
    }

    // Answer Format for Multiple Choice QUestions

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