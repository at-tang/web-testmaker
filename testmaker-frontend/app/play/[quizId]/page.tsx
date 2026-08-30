"use client"
import { getSession, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Result {
    answers: Array<Array<string>>
    quizId: string,
}

export default function playQuiz({params}: {params: Promise<{quizId: string}>}) {
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState({});

    const [givenAnswers, setGivenAnswers] = useState([]);

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

                if (!response.ok) throw new Error("Error!")

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

                if (!response.ok) throw new Error("Error!")

                const result = await response.json();
                setQuiz(result)
            }

            let givenAnswers = [];

            for (let i = 0; i < quiz.questions.length; i++) {
                givenAnswers.push("");
            }

            } catch (error) {
                console.error(error)
            }


        }
        getQuiz();
    }, [])

    return (
        <>
            <p>{quizId}</p>
        </>
    )
}