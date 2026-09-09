import { useContext, useState } from "react";
import { QuizContext, SaveStatusContext } from "../../page";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import SaveLoadingScreen from "./SaveLoadingScreen";
import { QuizFormatChecker } from "./QuizFormatChecker";

export default function SaveButton() {
    const [quiz, setQuiz] = useContext(QuizContext)
    const [saveStatus, setSaveStatus] = useContext(SaveStatusContext);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();


    

    const saveToDB = async () => {
        console.log(quiz)
        setSaveStatus(true)

        // Check if the input given is proper
        let message = QuizFormatChecker(quiz);
        if (message !== "") {
            setErrorMessage(message)
            setSaveStatus(false)
            return
        }
        setErrorMessage("");

        try {
            let inputJSON = JSON.stringify(quiz)
            console.log(inputJSON);
            const session = await getSession();
            console.log(session)

            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `api/private/quiz/update`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${session?.idToken}`,
                    "Content-Type": "application/json"
                },
                body: inputJSON
            
            })

            
            if (!response.ok) {throw new Error (response.status) }

            const result = await response.json()
            console.log("Saved")
            router.replace(`/quiz/view/${result.id}`)

            setSaveStatus(false)

           
        } catch (error) {
            setErrorMessage(error + " There was an issue on the server. Please try again later.")
            setSaveStatus(false)
            console.error(error);
        }
    


    }


    return (
        <div>
            <SaveLoadingScreen/>
            <p className="text-center text-red-500">{errorMessage}</p>
            <button onClick={() => {saveToDB()}}
            disabled={saveStatus}
            className="text-black bg-white rounded-full border-2 p-1 w-full hover:cursor-pointer hover:brightness-75">

            {saveStatus ? "Saving..." : "Save Quiz"}
            </button>

            
        </div>
    )


}