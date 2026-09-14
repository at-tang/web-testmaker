import TextButton from "@/app/Components/Buttons/TextButton";
import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useState } from "react";

export default function VisibleEdit() {
    
    const [quiz, setQuiz] = useContext(QuizContext)
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        if (quiz.visible == false) setButtonText("Private")
        else setButtonText("Public")
    }, [])

    const setVisible = () => {
        setQuiz({...quiz, visible: !(quiz.visible)})

    }

    return (
        <div className="flex items-center mb-2">
            <b>Visibility:</b>
            <span className="mr-3"/>
            <TextButton clickFunction={() => {setVisible()}} text={quiz.visible ? "Public" : "Private"}/>

        </div>
    )
}