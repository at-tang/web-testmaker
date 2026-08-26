import { useContext, useRef } from "react"
import { QuizContext } from '../../page'
import EditAnswersList from "./EditAnswerList";
import AddAnswerButton from "./AddAnswerButton";
import RemoveQuestionButton from "./RemoveQuestionButton";




export default function EditQuestion({i = 0}: {i?: number}) {

    const [quiz, setQuiz] = useContext(QuizContext);

    const updateQuiz = () => {
        const newQuestion = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            type: typeRef.current.value,
            
            points: Number(pointsRef.current.value),
            explanation: explanationRef.current.value,
            answers: question.answers
            
        }
        const quizCopy = {...quiz};
        quizCopy.questions[i] = newQuestion;


        setQuiz(quizCopy);

        console.log(quiz)
    }

    const updateQuizType = () => {

        let newAnswers ;

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

        else {

            newAnswers = []
        }

        const newQuestion = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            type: typeRef.current.value,
            
            points: Number(pointsRef.current.value),
            explanation: explanationRef.current.value,
            answers: newAnswers
            
        }
        const quizCopy = {...quiz};
        quizCopy.questions[i] = newQuestion;


        setQuiz(quizCopy);

        console.log(quiz)
    }

    
 
    const titleRef = useRef(null);
    const numberRef = useRef(null);
    const pointsRef = useRef(null);
    const typeRef = useRef(null);
    const descriptionRef = useRef(null);
    const explanationRef = useRef(null);
    const answersRef = useRef(null);

    const question = quiz.questions[i];


    
    // <input value={quiz.questions[index].description} ref={descriptionRef} className="bg-white text-black border-4 p-1"></input>
    return ( 
        <>
            <div className="p-4 border-2 border-white rounded-xl">

                <p>Question {i}</p>

                <RemoveQuestionButton i={i}/>

                

                <select
                ref={typeRef}
                onChange={() => updateQuizType()}
                value={question.type}
                >
                    <option value="MC">Multiple Choice</option>
                    <option value="TF">True/False</option>
                    <option value="SI">Short Input</option>
                </select>

                <input 
                ref={titleRef}
                value={question.title}
                placeholder = "Enter title" 
                onChange={() => updateQuiz()}
                className="bg-white text-black border-2 w-full h-full" >
                </input>

                <textarea
                ref={descriptionRef}
                value={question.description}
                className="bg-white text-black w-full"
                onChange={() => updateQuiz()}
                ></textarea>

                <div className="flex">
                    <p>Points: </p>

                    <input type="number"
                    ref={pointsRef}
                    value={question.points}
                    onChange={() => updateQuiz()}
                    className="text-right border-2 px-2 border-white ml-4 w-16"
                    ></input>

                </div>

                <textarea 
                ref={explanationRef}
                value={question.explanation}
                placeholder = "Enter explanation" 
                onChange={() => updateQuiz()}
                className="bg-white text-black border-2 w-full h-full" >
                </textarea>



                <EditAnswersList i={i}/>

                {quiz.questions[i].type == "MC" | quiz.questions[i].type == "SI" && <AddAnswerButton i={i}/>}

                





                


                

            </div>
        </>
    )
}