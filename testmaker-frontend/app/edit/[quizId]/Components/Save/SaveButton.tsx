import { useContext } from "react";
import { QuizContext } from "../../page";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SaveButton() {
    const [quiz, setQuiz] = useContext(QuizContext)

    const saveToDB = async () => {
        console.log(quiz)
        try {
            let inputJSON = JSON.stringify(quiz)
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

            redirect('/home')
        } catch (error) {
            console.error(error);
        }
    


    }


    return (
        <>
            <button onClick={() => {saveToDB()}}
                className="border-white border-2 p-1 w-full">
                Save
            </button>
        </>
    )


}