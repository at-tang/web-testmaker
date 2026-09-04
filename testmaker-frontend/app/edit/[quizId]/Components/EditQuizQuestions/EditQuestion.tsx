import { useContext, useEffect, useRef, useState } from "react"
import { QuizContext } from '../../page'
import EditAnswersList from "./EditAnswerList";
import AddAnswerButton from "./AddAnswerButton";
import RemoveQuestionButton from "./RemoveQuestionButton";
import { SwapIndexesContext } from "./EditQuestionsList";


// This file is set to be reorganized and potentially partitioned into smaller
// segements for organizational pur

export default function EditQuestion({i = 0}: {i?: number}) {

    

    const [quiz, setQuiz] = useContext(QuizContext);
    const [swapIndexes, setSwapIndexes] = useContext(SwapIndexesContext)

    const borderRef = useRef(null);


    const numberRef = useRef(null);
    const pointsRef = useRef(null);
    const typeRef = useRef(null);
    const descriptionRef = useRef(null);
    const explanationRef = useRef(null);
    const answersRef = useRef(null);
    const caseSensitiveRef = useRef(null);

    const question = quiz.questions[i];

    // Used to change the colour of the border when swapping question positions
    const [variableBorder, setVariableBorder] = useState(" border-white ");

    useEffect(() => {
        if (swapIndexes[0] == i) {
            setVariableBorder(" border-blue-500")
        } 
        else if (swapIndexes[0] != -1) {
            setVariableBorder(" border-white brightness-50 hover:brightness-100 hover:cursor-pointer transition ease-in-out ")
        }
        else {
            setVariableBorder(" border-white ")
        }

    }, [swapIndexes])

    const handleBackgroundClick = (e) => {
        // Handles the swap functionality
        // Upon clicking once on a question, you select said question to be moved
        // Upon clicking another question (or the same one), the indexes of both questions are swapped

        if (e.target === e.currentTarget) {
            console.log("Clicked!")
            console.log(swapIndexes)

            if (swapIndexes[0] === -1) { // initiate swap process
                setSwapIndexes([i, -1])
                console.log(swapIndexes)
            }
            else {



                let quizCopy = {...quiz}
                let swap1 = {...quiz.questions[swapIndexes[0]], number: i}
                let swap2 = {...quiz.questions[i], number: swapIndexes[0]}

                quizCopy.questions[swapIndexes[0]] = swap2;
                quizCopy.questions[i] = swap1;
                console.log(quizCopy)
                setSwapIndexes([-1, -1])
                setQuiz(quiz)
                
            }
        }

    }


    // Updating The Quiz Based on Parameters

    const updateQuiz = () => {
        if (pointsRef.current.value < 1) {
            pointsRef.current.value = 1;
        }
        let newQuestion = {
            description: descriptionRef.current.value,
            type: typeRef.current.value,
            
            points: Number(pointsRef.current.value),
            explanation: explanationRef.current.value,
            answers: question.answers,
            
        }

        const quizCopy = {...quiz};
        quizCopy.questions[i] = newQuestion;


        setQuiz(quizCopy);

        console.log(quiz)
    }


    const updateQuizType = () => {

        let newAnswers = [];

        if (typeRef.current.value == "TF") {
            newAnswers = [
                {
                    content: "True",
                    correct: true,
                    explanation: ""
                },
                {
                    content: "False",
                    correct: false,
                    explanation: ""
                }
            ]
        }

        else if (typeRef.current.value == "MC" || typeRef.current.value == "SI") {
            newAnswers = [
                {
                    content: "",
                    correct: false,
                    explanation: ""
                }
            ]
        }


        const newQuestion = {
            description: descriptionRef.current.value,
            type: typeRef.current.value,
            
            points: Number(pointsRef.current.value),
            explanation: explanationRef.current.value,
            answers: newAnswers,
            
        }
        let quizCopy = {...quiz};
        quizCopy.questions[i] = newQuestion;


        setQuiz(quizCopy);

        console.log(quiz)
    }

    
 
    


    
    // <input value={quiz.questions[index].description} ref={descriptionRef} className="bg-white text-black border-4 p-1"></input>
    return ( 
        <>
            <div className={variableBorder + " p-4 border-2 rounded-xl mb-4 hover:cursor-pointer"}
            ref={borderRef}
            onClick={(e) => {handleBackgroundClick(e)}}>

                <RemoveQuestionButton i={i}/>

                <h1 className="text-4xl mb-2 w-max">Question {i + 1}</h1>
                

                <select
                ref={typeRef}
                onChange={() => updateQuizType()}
                value={question.type}
                className="text-xl mb-4 w-max"
                >
                    <option value="MC">Multiple Choice</option>
                    <option value="TF">True/False</option>
                    <option value="SI">Short Input</option>
                </select>


                <p>Description: </p>
                <textarea
                ref={descriptionRef}
                value={question.description}
                maxLength={300}
                className="bg-white text-black w-full mb-4 resize-none h-20"
                onChange={() => updateQuiz()}
                ></textarea>


                <div className="flex mb-4">
                    <p>Points: </p>

                    <input type="number"
                    ref={pointsRef}
                    value={question.points}
                    onChange={() => updateQuiz()}
                    min={1}
                    className="text-right border-2 px-2 border-white ml-4 w-16"
                    ></input>

                </div>

                <p>Explanation: (Any justification for the correct answer(s)) </p>
                <textarea 
                ref={explanationRef}
                value={question.explanation}
                placeholder = "[OPTIONAL] Enter your explanation here. (300 Characters)" 
                maxLength={300}
                onChange={() => updateQuiz()}
                className="bg-white text-black border-2 w-full h-20 resize-none" >
                </textarea>

                <hr className="my-4"/>

                <p className="text-xl">Answers</p>


                {question.type == "SI" && <div className="flex items-center mb-4">
                    Case-Sensitive:
                    <input ref={caseSensitiveRef}
                    type="checkbox"
          
                    value={quiz.questions[i].caseSensitive}
                    onChange={(() => {
                        let quizCopy = {...quiz}
                        quizCopy.questions[i].caseSensitive = caseSensitiveRef.current.checked
                        setQuiz(quizCopy)
                    })}
                    className="ml-3"
                    ></input>
                </div>}



                <EditAnswersList i={i}/>

                {(quiz.questions[i].type == "MC" || quiz.questions[i].type == "SI") && <AddAnswerButton i={i}/>}

                
                


                

            </div>
        </>
    )
}