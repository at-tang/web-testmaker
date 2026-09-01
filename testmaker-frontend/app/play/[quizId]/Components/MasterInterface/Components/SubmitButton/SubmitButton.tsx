
import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, QuizContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";

export default function SubmitButton() {

    const [quiz, setQuiz] = useContext(QuizContext);
    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);

    const router = useRouter();

    const submitQuiz = async () => {

        try {
            const session = await getSession();
            if (!session) throw new Error();

            let input = {
                quiz: quiz,
                allGivenAnswers: givenAnswers,
                allQuestions: questionList
            }

            let inputJSON = JSON.stringify(input)
            console.log(inputJSON)

            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "api/private/result/evaluate", 
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${session?.idToken}`,
                        "Content-Type": "application/json"
                    },
                    body: inputJSON

                }
            )
            if (!response.ok) throw new Error(`${response.status}`)
            const result = await response.json();

            console.log(result);


            sessionStorage.setItem("mostRecentResult", JSON.stringify(result));
            console.log(sessionStorage.getItem("mostRecentResult"));
            router.push("/result/most-recent-result");

        } catch (error) {
            console.error(error)
        }
    }

    
    return (
        <>
            <button onClick={() => {submitQuiz()}}>Submit</button>
        </>
    )
}