"use client"
import { getSession, useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'
import { createContext, use, useEffect, useState } from 'react'
import EditQuestion from './Components/EditQuizQuestions/EditQuestion';
import EditQuestionsList from './Components/EditQuizQuestions/EditQuestionsList';
import { redirect } from 'next/navigation'
import SaveButton from './Components/Save/SaveButton';
import EditMetadataMenu from './Components/EditMetadata/Menu/EditMetadataMenu';
import OpenEditMetadataMenu from './Components/EditMetadata/OpenEditMetadataMenu';
import { logout } from '@/app/api/auth/[...nextauth]/authServerFunctions';
import { ErrorReroute } from '@/app/api/ErrorPageRereouting/ErrorRerouting';
import EditMetadataList from './Components/EditMetadata/EditMetadataList';
import { QuizEdit } from '@/app/Types/types';
import BackButton from '@/app/Components/Buttons/BackButton';

export const QuizContext = createContext();
export const SaveStatusContext = createContext();
export const UpToDateContext = createContext();

export default function EditPage({params}: {params: Promise<{quizId: string}>}) {

    const router = useRouter();

    const {quizId} = useParams();
    const [quiz, setQuiz] = useState(new QuizEdit);
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useState(false)
    const [upToDate, setUpToDate] = useState(true);

    const [saveStatus, setSaveStatus] = useState(false); // Determines if the app is currently saving to the database

    

    useEffect(() => {
        async () => {
            const session = await getSession();
            if (!session) redirect("/home")
        }
    }, [])
 

    useEffect(() => {
        const loadSession = async () => {
            const session = await getSession();
            if (!session) {
                router.replace("/home")
            }

            console.log(session);

            if (quizId == "newquiz") { // If the url states to create a new quiz
                return; // Then use the default state given to quiz as a template for a quiz

            }


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

                if (!response.ok) {
                    router.push(ErrorReroute(response.status))
                    return;
                }

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
        setUpToDate(false)
        console.log(quiz)



    }, [quiz, quiz.questions])



    return(
        <>
            <QuizContext.Provider value={[quiz, setQuiz]}>
            <SaveStatusContext.Provider value={[saveStatus, setSaveStatus]}>
            <UpToDateContext.Provider value={[upToDate, setUpToDate]}>

                <div className="w-full flex justify-center">
                    
                     <div className="max-w-300 flex-1 p-4">
                        <BackButton/>
                        <div className="mb-4"/>

      


                        
                        <EditMetadataList/>

                        <SaveButton/>

                        <h1 className="text-3xl mb-1 mt-6">Edit Questions</h1>
                        <div className="bg-white w-full h-0.5 mb-4"/>

                        <EditQuestionsList/>

                        <SaveButton/>

                    </div>

                </div>
                           
            
            </UpToDateContext.Provider>
            </SaveStatusContext.Provider>
            </QuizContext.Provider>
        </>
    )

}