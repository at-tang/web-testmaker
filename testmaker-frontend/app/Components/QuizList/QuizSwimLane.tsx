import { authGetFetch } from "@/app/api/ApiCall/fetch";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Quiz from "./Quiz";
import { DisplayQuiz } from "@/app/Types/types";

export default function QuizSwimLane(
    {
        apiPath = "api/private/quiz/get/view/list/search?page_requested=1&entries_per_page=8&sort=top",

    }:
    {
        apiPath?: String,

    }
) {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<Array<DisplayQuiz>>();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const session = await getSession();
                if (!session) router.replace("/home")

                const response = await authGetFetch(apiPath, session?.idToken, "GET")
                if (!response.ok()) router.replace(ErrorReroute(response.status));

                setQuizzes(response.result.quizzes);

            } catch (error) {
                console.error(error);
            }
        }
        fetchQuizzes();

    }, [])

    if (!quizzes) {
        return (
            <>
            Loading...
            </>
        )
    }

    return (
        <div className="overflow-x-scroll sm:zoom-100 zoom-[0.8] w-full scrollbar-none  scrollbar-thumb-white flex gap-2 h-73">
            {
                quizzes.map((quiz, i) => {
                    return (
                        <span key={i} className="">
                            <Quiz quiz={quiz}/>
                        </span>

                    )
                })
            }

        </div>
    )
}