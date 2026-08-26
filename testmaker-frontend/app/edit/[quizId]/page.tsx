"use client"
import { getSession, useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import { createContext, use, useEffect, useState } from 'react'
import EditQuestion from './Components/EditQuizQuestions/EditQuestion';
import EditQuestionsList from './Components/EditQuizQuestions/EditQuestionsList';
import { redirect } from 'next/navigation'
import SaveButton from './Components/Save/SaveButton';
import EditMetadataMenu from './Components/EditMetadata/EditMetadataMenu';
import OpenEditMetadataMenu from './Components/EditMetadata/OpenEditMetadataMenu';

export const QuizContext = createContext();

export default function EditPage({params}: {params: Promise<{quizId: string}>}) {

    const {quizId} = useParams();
    const [quiz, setQuiz] = useState({questions: []});
    const [quizDisplay, setQuizDisplay] = useState(<></>);
    const [questions, setQuestions] = useState([]);


    

    useEffect(() => {
        const loadSession = async () => {
            const session = await getSession();

            const expireDate = new Date(session?.expires).getTime();
            const currentDate = new Date().getTime();
            console.log(`Expiration Date: ${expireDate}, Current Date: ${currentDate}`)
            if (currentDate >= expireDate) redirect('/login');

            console.log(session);


            try {

                const response = await fetch(`http://localhost:8080/api/private/quiz/edit/${quizId}`, 
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${session?.idToken}`
                        },
                        
                    }
                );

                console.log(response);

                if (!response.ok) throw new Error(`${response.status}`);

                const result = await response.json();
                console.log(result);
                setQuiz(result);
                
            } catch (error) {
                console.error(error);
            }

        }
        loadSession();
    }, [])

    useEffect(() => {
        setQuestions(quiz.questions)
        console.log(quiz)


    }, [quiz, quiz.questions])



    return(
        <>
            <QuizContext.Provider value={[quiz, setQuiz]}>
                
                <OpenEditMetadataMenu/>

                <div className="sm:flex">
                    <div className="bg-gray-500 w-1/2"/>
                    <EditQuestionsList/>

                </div>

                
                
                
            <p>Quiz Being Edited: {quizId}</p>
            <SaveButton/>

            </QuizContext.Provider>
        </>
    )

}