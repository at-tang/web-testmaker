
import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, QuizContext, CurrentQuestionContext, TimeLeftContext } from "@/app/play/[quizId]/page";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function SubmitButton() {

    const [quiz, setQuiz] = useContext(QuizContext);
    const [questionList, setQuestionList] = useContext(QuestionListContext);
    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext(CurrentQuestionContext);
    const [timeLeft, setTimeLeft] = useContext(TimeLeftContext);

    const [allowSubmit, setAllowSubmit] = useState(true); // Determines if submit button can be pressed

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

            // Pushed to session storage to minimize the number of api calls
            sessionStorage.setItem(`resultView${result.id}`, JSON.stringify(result));

            router.replace(`/result/${result.id}`);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (timeLeft == 0) {
            submitQuiz();
        }
        else if (timeLeft >= 0 && timeLeft < 3) {
            setAllowSubmit(false)

        }

    }, [timeLeft])

    
    return (
        <>
            <button 
            disabled={!allowSubmit} 
            onClick={() => {submitQuiz()}}
            >
                
                Submit</button>
        </>
    )
}