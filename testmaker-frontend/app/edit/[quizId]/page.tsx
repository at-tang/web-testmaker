"use client"
import { getSession, useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import { createContext, use, useEffect, useState } from 'react'
import EditQuestion from './Components/EditQuizQuestions/EditQuestion';
import EditQuestionsList from './Components/EditQuizQuestions/EditQuestionsList';
import { redirect } from 'next/navigation'
import SaveButton from './Components/Save/SaveButton';
import EditMetadataMenu from './Components/EditMetadata/Menu/EditMetadataMenu';
import OpenEditMetadataMenu from './Components/EditMetadata/OpenEditMetadataMenu';
import { logout } from '@/app/api/auth/[...nextauth]/authServerFunctions';

export const QuizContext = createContext();
export const PortraitMetadataMenuContext = createContext();

export default function EditPage({params}: {params: Promise<{quizId: string}>}) {

    const {quizId} = useParams();
    const [quiz, setQuiz] = useState({questions: []});
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useState(false)

    

    useEffect(() => {
        async () => {
            const session = await getSession();
            if (!session) redirect("/login")
        }
    })


    

    useEffect(() => {
        const loadSession = async () => {
            const session = await getSession();

            /*
            const expireDate = new Date(session?.expires).getTime();
            const currentDate = new Date().getTime();
            console.log(`Expiration Date: ${expireDate}, Current Date: ${currentDate}`)
            console.log(`Current: ${new Date()}\nExpires: ${new Date(session?.expires)}`)
            if (currentDate >= expireDate) redirect('/login');
            */

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
                logout();
            }

        }
        loadSession();
    }, [])

    useEffect(() => {
        console.log(quiz)


    }, [quiz, quiz.questions])



    return(
        <>
            <QuizContext.Provider value={[quiz, setQuiz]}>
            <PortraitMetadataMenuContext.Provider value={[portraitMetadataMenu, setPortraitMetadataMenu]}>
                
                {!portraitMetadataMenu && <OpenEditMetadataMenu/>}
                {portraitMetadataMenu && <EditMetadataMenu/>}

                <div className="sm:flex">
                    <div className="bg-gray-500 w-1/2"></div>
                    <EditQuestionsList/>

                </div>

                
                
                
            <p>Quiz Being Edited: {quizId}</p>
            <SaveButton/>


            </PortraitMetadataMenuContext.Provider>
            </QuizContext.Provider>
        </>
    )

}