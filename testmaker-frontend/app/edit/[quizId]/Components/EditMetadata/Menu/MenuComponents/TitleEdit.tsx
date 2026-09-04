import { PortraitMetadataMenuContext, QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useRef, useState } from "react";

export default function TitleEdit() {

    const titleRef = useRef();

    const [quiz, setQuiz] = useContext(QuizContext);
    const [charactersLeft, setCharactersLeft] = useState(60);

    useEffect(() => {
        setCharactersLeft(60 - quiz.title.length)

    }, [quiz.title])


    return (
         <div className="block">


            <p>Title: ({charactersLeft} Characters Left)</p>

            <input ref={titleRef}
            placeholder="Enter your quiz's title here"
            maxLength={60}
            onChange={() => {
                let quizCopy = {...quiz}
                quizCopy.title = titleRef.current.value;
                setQuiz(quizCopy)
            }}
            value={quiz.title}
            className="block text-4xl mb-2 w-full h-max"
            ></input>

            <div className="w-full h-0.5 bg-white mb-4 "/>


        </div>
    )
}