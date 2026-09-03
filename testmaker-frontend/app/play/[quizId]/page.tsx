"use client"
import { GivenAnswer, Question, Quiz, Answer } from "@/app/Types/types";
import { getSession, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, createContext } from "react";
import MasterInterface from "./Components/MasterInterface/MasterInterface";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";

export const QuizContext = createContext();
export const GivenAnswersContext = createContext();
export const CompleteContext = createContext();
export const QuestionListContext = createContext();
export const CurrentQuestionIndexContext = createContext();
export const CurrentQuestionContext = createContext();
export const TimeLeftContext = createContext();
export const TimerActiveContext = createContext();


export default function playQuiz({params}: {params: Promise<{quizId: string}>}) {
    const {quizId} = useParams();

    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz>();
    const [givenAnswers, setGivenAnswers] = useState<Array<GivenAnswer>>([]);
    const [complete, setComplete] = useState<boolean>(false);
    const [questionList, setQuestionList] = useState<Array<Question>>([]); // List of questions. Used for quizzes where questions are randomized
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Determines which question to display on screen right now
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questionList[currentQuestionIndex]); // QUestion currently being presented to user

    const [timeLeft, setTimeLeft] = useState(-1); // tracks how many seconds are left 
    const [timerActive, setTimerActive] = useState(false); // tracks if the timer is active
    
    const contextValue = {quiz, setQuiz, givenAnswers, setGivenAnswers, complete, setComplete, questionList, setQuestionList, currentQuestionIndex, setCurrentQuestionIndex}

    useEffect(() => {
        const getQuiz = async () => {

            const session = await getSession();
            console.log(session)

            if (session) console.log(`Session for ${session.user.name}`)
            else console.log(`No session active`)

            try {
            if (session) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/quiz/get/play/${quizId}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session?.idToken}`,
                            "Content-Type": "application/json"
                        }

                    }
                )

                if (!response.ok) {
                    router.push(ErrorReroute(response.status))
                    return;
                }

                const result = await response.json();
                setQuiz(result)

            }

            else {
                console.log('Public accessed!')
                 const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/public/quiz/get/play/${quizId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )

                if (!response.ok) {
                    router.push(ErrorReroute(response.status))
                    return;
                }



                const result = await response.json();
                setQuiz(result)
            }

            // Create a new array of GivenAnswers, which represent a quiz fresh
           

            

            } catch (error) {
                console.error(error)
            }


        }
        getQuiz();
    }, [])


    // Set up Question List, as well as shuffle questions

    useEffect(() => {
        if (quiz == null) return // Used to nullify first useEffect

        let questionListCopy = [...quiz.questions]

        // Shuffle Questions if randomQuestionOrder is active
        if (quiz?.randomQuestionOrder) {
            for (let i = 0; i < questionListCopy.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [questionListCopy[i], questionListCopy[j]] = [questionListCopy[j], questionListCopy[i]];
            }
        }

        setTimeLeft(quiz.time * 60); // Set time left to quiz's alloted time, tracked in minutes
        setTimerActive(true)

        setQuestionList(questionListCopy)

    }, [quiz])


    // Creating the object that will be sent to backend to evaluate
    useEffect(() => {
        if (quiz == null) return 

        let givenAnswers: Array<GivenAnswer> = [];

            for (let i = 0; i < quiz.questions.length; i++) {
                let currentGivenAnswer: GivenAnswer = {
                    questionId: questionList[i].id,
                    givenAnswers: []
                }
                givenAnswers.push(currentGivenAnswer)
            }
            setGivenAnswers(givenAnswers);
        
    }, [questionList])


    useEffect(() => {
        setCurrentQuestion(questionList[currentQuestionIndex])
        console.log("Current Question Set!")

    }, [currentQuestionIndex, questionList])
    

    // Debugging Tools 
    useEffect(() => {console.log(quiz)}, [quiz])
    useEffect(() => {console.log(questionList)}, [questionList])
    useEffect(() => {console.log(givenAnswers)}, [givenAnswers])
    useEffect(() => {console.log(currentQuestionIndex)}, [currentQuestionIndex])
    useEffect(() => {console.log(currentQuestion), [currentQuestion]})

    return (
        <>
        <QuizContext.Provider value={[quiz, setQuiz]}>
        <GivenAnswersContext.Provider value={[givenAnswers, setGivenAnswers]}>
        <CompleteContext.Provider value={[complete, setComplete]}>
        <QuestionListContext.Provider value={[questionList, setQuestionList]}>
        <CurrentQuestionIndexContext.Provider value={[currentQuestionIndex, setCurrentQuestionIndex]}>
        <CurrentQuestionContext.Provider value={[currentQuestion, setCurrentQuestion]}>
        <TimeLeftContext.Provider value={[timeLeft, setTimeLeft]}>
        <TimerActiveContext.Provider value={[timerActive, setTimerActive]}>

            <p>Quiz ID: {quizId}</p>
            <MasterInterface/>

        </TimerActiveContext.Provider>
        </TimeLeftContext.Provider>
        </CurrentQuestionContext.Provider>
        </CurrentQuestionIndexContext.Provider>
        </QuestionListContext.Provider>
        </CompleteContext.Provider>
        </GivenAnswersContext.Provider>
        </QuizContext.Provider>
        </>
        
    )
}