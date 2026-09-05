import { DisplayQuiz } from "@/app/Types/types";
import Quiz from "./Quiz";

export default function QuizList({quizList = []}: {quizList: Array<DisplayQuiz>}) {

    if (quizList != null) return (

        <div className=" w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white grid grid-cols-[repeat(auto-fit,minmax(18rem,18rem))] justify-center gap-4 p-4">
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