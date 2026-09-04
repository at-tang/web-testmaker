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
            <div className="flex items-center mb-3">


                <input ref={contentRef}
                onChange={() => {
                    quiz.questions[i].answers[j].content = contentRef.current.value
                    quiz.questions[i].answers[j].correct = true,
                    quiz.questions[i].answers[j].explanation = ""
                    setQuiz({...quiz})
                }}
                value={answer.content}
                placeholder="Enter the answer here"
                className="w-full h-full border-white p-1 border-2 mr-4">

                </input>

                <MoveAnswerButton i={i} j={j}/>

                <RemoveAnswerButton i={i} j={j}/>


                

              
            </div>
        </>
    )
}