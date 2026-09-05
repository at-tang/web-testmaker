import { QuizResultListEntry } from "@/app/Types/types";
import { createContext, useEffect, useState } from "react";
import QuizResultList from "./QuizResultList";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { getSession } from "next-auth/react";
import ForwardBackArrowButtons from "./PageChange/ForwardBackArrowButtons";

export const CurrentPageContext = createContext();

export default function QuizResultListMaster({type, searchEnabled}: {type: string, searchEnabled: boolean}) {
    /*
    The main class for viewing quiz results.

    Contains search functionality, page view, etc.
    
    type: String -> represents what kind of QuizResult entries are being listed. Stores the api
    */

    const ENTRIES_PER_PAGE = 8;
    const [quizResultList, setQuizResultList] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPages, setMaxPages] = useState<number>(0);


    const loadEntries = async () => {
        const session = await getSession();
        if (!session) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${type}/${currentPage}/${ENTRIES_PER_PAGE}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session?.idToken}`,
                    "Content-Type": "application/json"

                }
            }
        )

        if (!res.ok) ErrorReroute(res.status)
        
        const result = await res.json();
        setQuizResultList(result.entries);
        setMaxPages(Math.ceil(result.numberOfEntries / ENTRIES_PER_PAGE))
            
    }


    useEffect(() => { // Whenever the page number is changed, make sure to get the appropiate QuizResults
        loadEntries()
    }, [currentPage])

    

    return (
        <div className="w-full">
            <CurrentPageContext.Provider value={{currentPage, setCurrentPage, maxPages, setMaxPages}}>
                <header>
                    <h1>Current Page: {currentPage}</h1>
                    <h1>Max Pages: {maxPages}</h1>
                    <ForwardBackArrowButtons/>

                </header>

                <main>
                    <QuizResultList quizResultList={quizResultList}/>
                </main>

            </CurrentPageContext.Provider>
            
        </div>

    )
}