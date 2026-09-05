import { QuizResultListEntry } from "@/app/Types/types";
import Link from "next/link";

export default function QuizResult({quizResult}: {quizResult: QuizResultListEntry}) {

    return (
        <div>
            <Link href={`/quiz/view/${quizResult.quizId}`}><h1 className="text-xl font-bold underline hover:brightness-75">{quizResult.title}</h1></Link>
            <p>Attempted on: {quizResult.dateAttempted}</p>
            <p className="mb-3">Score: {quizResult.pointsObtained}/{quizResult.pointsTotal}</p>

            <div className="flex gap-2">

                <Link href={`/result/${quizResult.id}`}>
                    <button className="rounded-full text-black bg-white px-2.5 py-1 mb-4 hover:brightness-75 hover:cursor-pointer hover:scale-102 transition ease-in-out">
                        View In Detail
                    </button>
                </Link>

                <Link href={`/play/${quizResult.quizId}`}>
                    <button className="rounded-full text-black bg-white px-2.5 py-1 mb-4 hover:brightness-75 hover:cursor-pointer hover:scale-102 transition ease-in-out">
                        Retry
                    </button>
                </Link>

            </div>

            


            <hr className="mb-4 mt-1"/>
        </div>
    )
}