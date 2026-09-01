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
        const session = getSession();
        if (!session) redirect("/home");

        if (sessionStorage.getItem("mostRecentResult") != null 
            && resultId == "most-recent-result") {
                let storageResult = sessionStorage.getItem("mostRecentResult");
                let storageResultJSON = JSON.parse(storageResult);
                console.log(storageResultJSON)
                if (storageResult != null) setResult(storageResultJSON);
                
            }
        

    }, [])

    useEffect(() => {
        if (result != null) {
        setPercentScore(Math.round(result.pointsObtained / result.pointsTotal));
        console.log(Math.round(result.pointsObtained / result.pointsTotal))
        console.log(percentScore)
        }

    }, [result])

    


    if (result != null) return (
        <>

            <Link href="/home"  className="text-3xl">{result.title}</Link>

            <p>Your Score: {result.pointsObtained} / {result.pointsTotal}</p>
            <p>Attempted on {new Date(result.dateAttempted).toString()}</p>


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

        </>
    )

    return(
        <div>
            Loading...
        </div>
    )

}