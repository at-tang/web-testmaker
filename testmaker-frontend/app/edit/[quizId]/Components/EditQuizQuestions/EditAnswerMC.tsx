import { useContext, useRef } from "react";
import { QuizContext } from "../../page";
import RemoveAnswerButton from "./RemoveAnswerButton";
import MoveAnswerButton from "./MoveAnswerButton";

export default function EditAnswerMC({i = 0, j = 0}: {i?: number, j?: number}) {
    const [quiz, setQuiz] = useContext(QuizContext);
    const answer = quiz.questions[i].answers[j];

    const contentRef = useRef(null);
    const correctRef = useRef(null);
    const explanationRef = useRef(null);


    return (
        <>
            <div className="flex">
                <h1>Answer {j}</h1>

                <input ref={contentRef}
                onChange={() => {
                    quiz.questions[i].answers[j].content = contentRef.current.value
                    setQuiz({...quiz})
                }}
                value={answer.content}
                placeholder="Enter the answer here"
                className="w-full h-max border-white p-1 border-2">

                </input>


                <input type="checkbox"
                ref={correctRef}
                onChange={() => {
                    quiz.questions[i].answers[j].correct = correctRef.current.checked
                    setQuiz({...quiz})
                }}
                checked={answer.correct}
                ></input>

                <MoveAnswerButton i={i} j={j}/>
                <RemoveAnswerButton i={i} j={j}/>

              
            </div>
        </>
    )
}