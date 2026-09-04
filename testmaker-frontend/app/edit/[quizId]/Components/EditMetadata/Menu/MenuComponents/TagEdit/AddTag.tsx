import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useRef, useState } from "react";

export default function AddTag() {
    /*
    A function for typing the tag's name and then assigning it
    to the quiz
    */

    const inputRef= useRef(null);
    const [quiz, setQuiz] = useContext(QuizContext)
    const [value, setValue] = useState("")

    const checkTag = (input: string) => {
        let newInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        
        return newInput

    }

    const addTag = () => {
        let toBeAdded: string = checkTag(inputRef.current.value)
        if (quiz.tags.length > 5) {
            return;
        }
        let quizCopy = {...quiz}
        quizCopy.tags.push(toBeAdded)
        setQuiz(quizCopy)
        setValue("")
    }



    const handleChange = (e) => {
        const cleansed = e.target.value.replace(/\s/g, '')
        setValue(cleansed)
    }




    return (
        <>
            <div className="flex justify-center items-center">
                <input ref={inputRef}
                placeholder="Add tag here"
                className="bg-white text-black w-60"
                onChange = {(e) => {handleChange(e)}}
                value={value}
                maxLength={20}
  
                ></input>

                <button onClick={() => addTag()} 
                className="bg-white text-black py-1 px-4 rounded-full ml-4 hover:brightness-75 hover:cursor-pointer">Add Tag</button>
            </div>
        </>
    )
}