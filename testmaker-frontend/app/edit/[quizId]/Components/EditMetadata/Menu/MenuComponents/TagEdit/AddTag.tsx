import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useRef } from "react";

export default function AddTag() {
    /*
    A function for typing the tag's name and then assigning it
    to the quiz
    */

    const inputRef= useRef(null);
    const [quiz, setQuiz] = useContext(QuizContext)

    const checkTag = (input: string) => {
        let newInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        
        return newInput

    }

    const addTag = () => {
        let toBeAdded: string = checkTag(inputRef.current.value)
        let quizCopy = {...quiz}
        quizCopy.tags.push(toBeAdded)
        setQuiz(quizCopy)
        inputRef.current.value = ""
    }


    return (
        <>
            <div>
                <input ref={inputRef}
                className="bg-white text-black"
  
                ></input>

                <button onClick={() => addTag()}>Add Tag</button>
            </div>
        </>
    )
}