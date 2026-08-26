import { useContext } from "react"
import { QuizContext } from "../../page"

export default function RemoveQuestionButton({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext)

    const deleteQuestion = () => {
            let quizCopy = {...quiz}
    
            let questionsCopy = [...(quiz.questions)]
            if (i == 0) {
                questionsCopy.shift();
                setQuiz({...quiz, questions: questionsCopy});
                console.log("i == 0 case")
                
            }
            else if (i == quiz.questions.length - 1) {
                questionsCopy.pop();
                setQuiz({...quiz, questions: questionsCopy});
                console.log("i == quiz.questions.length - 1 case")
            } else {
                let slice1 = quiz.questions.slice(0,i)
                let slice2 = quiz.questions.slice(i+1);
                let newQuestions = slice1.concat(slice2);
                
    
                setQuiz({...quiz, questions: newQuestions})
                console.log("else case")
    
            }
            
        }


    return (
        <button
                onClick={() => deleteQuestion()}
                className="rounded-full bg-white text-black block w-8 h-8"
        >X</button>

    )

}