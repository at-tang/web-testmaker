import { useContext, useState } from "react";
import { QuizContext, SaveStatusContext } from "../../page";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SaveLoadingScreen from "./SaveLoadingScreen";

export default function SaveButton() {
    const [quiz, setQuiz] = useContext(QuizContext)
    const [saveStatus, setSaveStatus] = useContext(SaveStatusContext);
    

    const saveToDB = async () => {
        console.log(quiz)
        setSaveStatus(true)
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

            console.log(response.headers.has("Error"))
            
            if (!response.ok) {throw new Error (response.status) }

            setSaveStatus(false)

           
        } catch (error) {
            console.error(error);
        }
    


    }


    return (
        <>
            <SaveLoadingScreen/>
            <button onClick={() => {saveToDB()}}
            disabled={saveStatus}

                       className="text-black bg-white rounded-full border-2 p-1 w-full hover:cursor-pointer hover:brightness-75">

            {saveStatus ? "Saving..." : "Save Quiz"}
            </button>
        </>
    )


}