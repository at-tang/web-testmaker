
import Popup from "@/app/Components/Popup/Popup";
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
    const [popup, setPopup] = useState(false); // Used to see if the popup to confirm your submission is currently active

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
            onClick={() => {setPopup(true)}}
            className="rounded-full border-white px-8 py-1.5 border-2 text-lg hover:cursor-pointer hover:bg-white hover:text-black transition ease-in-out"
            >
                
                Submit Quiz</button>

            <Popup condition={popup} setCondition={setPopup}>
                <h1 className="text-center text-2xl">Confirm Submission</h1>
                <hr className="mb-2"/>
                <p className="mb-5">Do you wish to submit your quiz? Doing so will bypass your remaining time and immediately evaluate your quiz. Note that the quiz will be automatically submitted when the timer end.</p>

                <div className="flex justify-center mb-2">
                    <button 
                    onClick={() => {submitQuiz()}}
                    className="w-48 border-2 border-white rounded-full px-4 py-1 hover:bg-white hover:text-black hover:cursor-pointer hover:scale-102 transition ease-in-out">
                        Submit Quiz
                    </button>

                </div>
            </Popup>
        </>
    )
}