import { createContext, useContext, useState } from "react";
import { QuizContext } from "../../page"
import EditAnswerMC from "./EditAnswerMC";
import AddAnswerButton from "./AddAnswerButton";
import EditAnswerTF from "./EditAnswerTF";
import EditAnswerSI from "./EditAnswerSI";

export const SwapAnswerContext = createContext();
export default function EditAnswersList({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);
    const question = quiz.questions[i];
    const answers = quiz.questions[i].answers;
    const [index1, setIndex1] = useState(-1); // One of the indexes that will be swapped

    // Answer Format for True/False Questions

    if (question.type == "TF") {
        return (
            <SwapAnswerContext.Provider value={[index1, setIndex1]}>
            <>
                <EditAnswerTF i={i}/>
            </>
            </SwapAnswerContext.Provider>
        )
    }


    // Answer Format for Short Input Questions

    if (question.type == "SI") {// If question type is Short Input
        return (
            <SwapAnswerContext.Provider value={[index1, setIndex1]}>
            <div>

            {answers.map((answer, j) => {
                return (
                        <div key={j}>
                            <EditAnswerSI i={i} j={j}/>
                        </div>
                )
            }) }
           
        </div>
        </SwapAnswerContext.Provider>
        )
    }

    // Answer Format for Multiple Choice QUestions

    return (
        <SwapAnswerContext.Provider value={[index1, setIndex1]}>
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

        </SwapAnswerContext.Provider>
    )
}