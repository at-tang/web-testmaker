import { QuizContext } from "@/app/edit/[quizId]/page";
import AddTag from "./AddTag";
import { useContext } from "react";
import Tag from "./Tag";

export default function TagEdit() {
    /*
    The part of the edit menu that modifies what tags 
    are assigned to the quiz
    */

    const [quiz, setQuiz] = useContext(QuizContext)

    return(
        <>
        <div className="border-2 p-2 h-32 gap-1 overflow-y-scroll grid grid-cols-3">
            {quiz.tags.map((tag, i) => {
            return (<Tag key={i} i={i}/>)

        })}
        </div>
            <AddTag/>
        </>
    )
}