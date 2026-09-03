import { useContext } from "react"
import { QuizContext } from "../page"
import Tag from "./Tag";

export default function TagList() {
    /*
    A container for all the tag components 
    */

    const [quiz, setQuiz] = useContext(QuizContext);

    return (
        <div className="flex">
        <div className="h-full flex items-center justify-center mr-2">
                Tags:
        </div>
        <div className="flex overflow-x-scroll scrollbar-none w-full h-7">
            

            {quiz.tags.map((tag, index) => {
                return (
                    <Tag key={index} tagName={tag}/>
                )
            })}
        </div>
        </div>
    )
}