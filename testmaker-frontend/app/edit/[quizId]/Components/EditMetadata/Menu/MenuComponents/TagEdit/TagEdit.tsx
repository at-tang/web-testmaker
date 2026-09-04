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
        <div className="w-full overflow-x-scroll scrollbar-none">
            <div className="w-full flex items-center justify-center">

                <div className=" p-2 h-12 sm:w-md w-96 overflow-x-scroll flex scrollbar-none">
                    {quiz.tags.map((tag, i) => {
                    return (<Tag key={i} i={i}/>)

                })}
            </div>

        </div>

        <AddTag/>
        </div>
    )
}