import { QuestionListContext, GivenAnswersContext, CurrentQuestionIndexContext, CurrentQuestionContext } from "@/app/play/[quizId]/page";
import { Answer, Question } from "@/app/Types/types";
import { useContext, useRef } from "react";

export default function AnswerMC({i = 0}: {i?: number}) {
    const [givenAnswers, setGivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);
    const [currentQuestion, setCurrentQuestion] = useContext<Question>(CurrentQuestionContext); 

    const checkboxRef = useRef(null);
    
    let answer: Answer = currentQuestion.answers[i];

    const findByContent= (content) => {
        return content == answer.content;

    }

    const selectAnswer = () => {

        // Add to answer list
        if (checkboxRef.current.checked == true) {
            let givenAnswersCopy = [...givenAnswers]
            givenAnswersCopy[currentQuestionIndex].givenAnswers.push(answer.content)
            givenAnswersCopy[currentQuestionIndex].givenAnswers.sort();
            console.log(givenAnswersCopy[currentQuestionIndex].givenAnswers)
            setGivenAnswers(givenAnswersCopy);
            console.log("You checked it!")
        } 

        // Remove from answer list
        else {
            let givenAnswersCopy = [...givenAnswers]
            let x = givenAnswersCopy[currentQuestionIndex].givenAnswers

            let index: number = givenAnswersCopy[currentQuestionIndex].givenAnswers.findIndex(findByContent)
            console.log(`Index: ${index}`)

            let firstHalf = x.slice(0, index)
            let secondHalf = x.slice(index + 1)
  
            givenAnswersCopy[currentQuestionIndex].givenAnswers = firstHalf.concat(secondHalf)

            console.log(givenAnswersCopy[currentQuestionIndex].givenAnswers)
            setGivenAnswers(givenAnswersCopy)
        }

    }

    const isItSelected = () => {
        /*
        When currentQuestion swaps to this particular question, this
        makes sures tha if the user is revisiting said question after completing it,
        the values they pushed in are still pushed
        */
        let index: number = givenAnswers[currentQuestionIndex].givenAnswers.findIndex(findByContent)
        if (index != -1) return true;
        return false;


    }

    const bodyClick = () => {
        checkboxRef.current.checked = !(checkboxRef.current.checked);
        selectAnswer();
    }

    return (
        <div className="mb-2">
            <span onClick={() => {bodyClick()}} className="flex w-1/2">
                <input 
                ref={checkboxRef}
                type="checkbox"
                onChange={() => {selectAnswer()}}
                checked={isItSelected()}
                className="mr-3"
                
                />

                 <p className="">{answer.content}</p>
                

            </span>
           

        </div>
    )
}