import { QuizContext, PortraitMetadataMenuContext } from "@/app/edit/[quizId]/page";
import { useRef, useContext, useState, useEffect } from "react";

export default function DescriptionEdit() {

    const descriptionRef = useRef(null);

    const [quiz, setQuiz] = useContext(QuizContext);
    const [charactersLeft, setCharactersLeft] = useState(300); // Indicates to user how many characters the user can continue writing

    useEffect(() => {
        setCharactersLeft(300 - quiz.description.length)

    }, [quiz])




    return (
        <>
            <div className="">
                <p>Description: ({charactersLeft} Characters Left) </p>
                <textarea 
                ref={descriptionRef}
                value={quiz.description}
                placeholder="Enter your description for this quiz (300 Characters)"
                maxLength={300}
                onChange={() => {
                    setQuiz({...quiz, description: descriptionRef.current.value});
                   
                }}
                className="border-black border-2 bg-white text-black
                            p-2 w-full h-48 resize-none overflow-y-scroll scrollbar-none"
                ></textarea>


            </div>
        </>
    )


}