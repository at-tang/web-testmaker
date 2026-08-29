import { PortraitMetadataMenuContext, QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useRef } from "react";

export default function TitleEdit() {

    const titleRef = useRef();

    const [quiz, setQuiz] = useContext(QuizContext);
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useContext(PortraitMetadataMenuContext);


    return (
         <div className="block">


            

            <input ref={titleRef}
            onChange={() => {
                let quizCopy = {...quiz}
                quizCopy.title = titleRef.current.value;
                setQuiz(quizCopy)
            }}
            value={quiz.title}
            className="block"
            ></input>


        </div>
    )
}