"use client"

import { getSession } from "next-auth/react"
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Result({params}: {params: Promise<{quizId: string}>}) {

    const {resultId} = useParams();

    const [result, setResult] = useState();
    const [percentScore, setPercentScore] = useState(0);



    // Load the result
    useEffect(() => {
        if (!resultId) return; // Don't proceed if resultId is not loaded yet

        const loadResultData = async () => {
            const session = await getSession();
            console.log("Session:", session);
            
            if (!session) {
                console.error("No session found");
                redirect("/error/unauthorized");
                return;
            }
            
            if (!session.idToken) {
                console.error("No idToken in session");
                console.error("Session keys:", Object.keys(session));
                redirect("/error/unauthorized");
                return;
            }

            // If in session storage, retrieve from Session storage
            const storageKey = `resultView${resultId}`;
            console.log("Looking for storage key:", storageKey);
            
            if (sessionStorage.getItem(storageKey) != null) {
                console.log("Found result in sessionStorage");
                let storageResult = sessionStorage.getItem(storageKey);
                let storageResultJSON = JSON.parse(storageResult!);
                console.log("Retrieved from storage:", storageResultJSON)
                setResult(storageResultJSON);
                return;
            }
            
            console.log("Result not in sessionStorage, making API call");

            // Else, perform an API call to the backend
            console.log("Making API call for resultId:", resultId);
            console.log("Session idToken:", session?.idToken ? "present" : "missing");
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/result/get/${resultId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.idToken}`,
                    "Content-Type": "application/json"
                },
            })

            console.log("Response status:", response.status);
            
            if (!response.ok) {
                console.error("Failed to fetch result:", response.status);
                const errorText = await response.text();
                console.error("Error response:", errorText);
                if (response.status === 401 || response.status === 403) {
                    redirect("/error/unauthorized");
                }
                return;
            }

            const responseResult = await response.json();
            setResult(responseResult);
        }
        loadResultData();

        

    }, [resultId])

    useEffect(() => {
        if (result != null) {
        setPercentScore(Math.round(result.pointsObtained / result.pointsTotal));
        console.log(Math.round(result.pointsObtained / result.pointsTotal))
        console.log(percentScore)
        }

    }, [result])

    


    if (result != null) return (
        <>

            <Link href={`/quiz/view/${result.quizId}`}  className="text-3xl">{result.title}</Link>

            <p>Your Score: {result.pointsObtained} / {result.pointsTotal}</p>
            <p>Attempted on {new Date(result.dateAttempted).toString()}</p>

            <Link href="/home">
            <button className="border-2 border-white p-2">Go Home</button>
            </Link>


            <hr></hr>

            {
                result.questionResults.map((qr, index) => {

                    let givenAnswers = "";
                    let correctAnswers = "";
                    for (const answer of qr.givenAnswers) {
                        givenAnswers += `${answer}, `
                    }
                    givenAnswers = givenAnswers.substring(0, givenAnswers.length - 2)

                    for (const answer of qr.correctAnswers) {
                        correctAnswers += `${answer}, `
                    }
                    correctAnswers = correctAnswers.substring(0, correctAnswers.length - 2)
                    

                    return (
                        <div key={index} className="mb-8">
                            <h1 className="text-lg mb-4">{index + 1}. {qr.description}</h1>

                            {givenAnswers !== "" && <p>Your Response: {givenAnswers}</p>}
                            {givenAnswers === "" && <p>You did not respond to this question.</p>}
                            <p>Correct Answers: {correctAnswers}</p>

                            {qr.explanation !== "" && <p>Explanation: {qr.explanation}</p>}

                            {qr.correct && <p className=" bg-green-600">CORRECT</p>}
                            {!qr.correct && <p className="bg-red-500">INCORRECT</p>}

                        </div>

                        

                    )
                })
            }

            <Link href="/home">
            <button className="border-2 border-white p-2">Go Home</button>
            </Link>

        </>
    )

    return(
        <div>
            Loading...
        </div>
    )

}