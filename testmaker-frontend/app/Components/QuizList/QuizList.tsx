import { DisplayQuiz } from "@/app/Types/types";
import Quiz from "./Quiz";

export default function QuizList({quizList = [], onDeleted}: {quizList: Array<DisplayQuiz>, onDeleted?: (quizId: DisplayQuiz["id"]) => void}) {

    if (quizList != null) return (

        <div className=" w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white grid grid-cols-[repeat(auto-fit,minmax(18rem,18rem))] justify-center gap-4 p-4">
        {quizList.map((quiz, index) => {
            return (

                    <Quiz key={quiz.id} quiz={quiz} onDeleted={onDeleted}/>
                    

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