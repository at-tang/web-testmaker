import { QuizContext } from "@/app/edit/[quizId]/page"
import { useContext } from "react"

export default function Tag({i = 0}: {i?: number}){
    const [quiz, setQuiz] = useContext(QuizContext)

    const deleteTag = () => {

        if (i == 0) {

            setQuiz({...quiz, tags: [quiz.tags.slice(1)]})
            return
        }
        let slice1 = quiz.tags.slice(0, i)
        let slice2 = quiz.tags.slice(i+1)
        console.log(slice1)
        console.log(slice2)
        let fullSlice = slice1.concat(slice2);
        console.log("Slice1 concated: " + slice1)
        setQuiz({...quiz, tags: fullSlice})

    }
    return (
        <div className="rounded-full bg-white text-black p-2 flex justify-center items-center w-max">
            <p>{quiz.tags[i]}</p>

            <button 
            onClick={() => deleteTag()}
            
            className="ml-2"
            >X</button>

        </div>
    )

}