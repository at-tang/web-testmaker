import { DisplayQuiz } from "@/app/Types/types";
import Quiz from "./Quiz";

export default function QuizList({quizList = []}: {quizList: Array<DisplayQuiz>}) {

    if (quizList != null) return (
        <div className="bg-green-700 w-full h-full overflow-y-scroll ">
        {quizList.map((quiz, index) => {
            return (

                    <Quiz key={index} quiz={quiz}/>
                    

            )
        })}
        </div>
    )

    return (
        <>
            <p>Loading...</p>
        </>
    )

}