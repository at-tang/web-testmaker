import TextButton from "@/app/Components/Buttons/TextButton";
import { QuizContext } from "@/app/edit/[quizId]/page";
import { useContext, useEffect, useRef, useState } from "react";

export default function TimeEdit() {
    const [quiz, setQuiz] = useContext(QuizContext)
    const [border, setBorder] = useState(" border-white ");
    const [value, setValue] = useState(quiz.time);
    const [expand, setExpand] = useState(false);
    const ref = useRef(null)
    

    useEffect(() => {
        setQuiz({...quiz, time: value})
    }, [value])

    return (

        <div className=" my-2 items-center mb-4">
            <TextButton 
            clickFunction={() => {quiz.time === -1 ? setValue(30) : setValue(-1)}}
            text={quiz.time === -1 ? "Turn On Timer" : "Turn Off Timer"}/> 
            <div className="mr-4 mb-2"/>

            {
            value !== -1 &&
            <div className="flex items-center">
            Time: 

            <input type="number"

            ref={ref}

            min={1} // Minimum number of minutes 

            max={120} // Maximum number of minutes

            value={value}

            onChange={(e) => {
                if ((Number(e.target.value) > 120)) {setValue(120); return;}
                if ((Number(e.target.value) < 1)) {setValue(1); return;}
                else {setValue(e.target.value)}


            }}
            className={border + " pl-4 py-0.5 mx-4 border-2 rounded-2xl "}></input>

            Minutes
            </div>
            }


    
        </div>
    )
}