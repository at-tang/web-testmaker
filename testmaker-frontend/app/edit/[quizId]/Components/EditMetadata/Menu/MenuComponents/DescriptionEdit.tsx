import { QuizContext, PortraitMetadataMenuContext } from "@/app/edit/[quizId]/page";
import { useRef, useContext } from "react";

export default function DescriptionEdit() {

    const descriptionRef = useRef(null);

    const [quiz, setQuiz] = useContext(QuizContext);
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useContext(PortraitMetadataMenuContext);

    return (
        <>
            <div className="">
                <textarea 
                placeholder="Enter your description for this quiz"
                maxLength={300}
                className="border-black border-2 bg-white text-black
                            p-2"
                ></textarea>


            </div>
        </>
    )


}