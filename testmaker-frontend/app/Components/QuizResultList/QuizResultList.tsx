import { QuizResultListEntry } from "@/app/Types/types";
import QuizResult from "./QuizResult";

export default function QuizResultList({quizResultList = []}: {quizResultList: Array<QuizResultListEntry>}) {

    if (quizResultList != null) return (

        <div className=" w-full h-full scrollbar-thin scrollbar-thumb-white justify-center p-4">
        {quizResultList.map((quizResult, index) => {
            return (

                    <QuizResult key={index} quizResult={quizResult}/>
                    

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