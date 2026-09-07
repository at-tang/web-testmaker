import { QuizResultListEntry } from "@/app/Types/types";
import { createContext, useEffect, useState } from "react";
import QuizResultList from "./QuizResultList";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { getSession } from "next-auth/react";
import ForwardBackArrowButtons from "./PageChange/ForwardBackArrowButtons";
import PageSelect from "./PageChange/PageSelect";
import Search from "./Search/Search";
import QuizList from "../QuizList/QuizList";

export const CurrentPageContext = createContext();

export default function QuizResultListMaster(
    {apiCall, searchEnabled, currentSearchQuery, entriesPerPage, entryType, searchRedirect}: 
    {   apiCall: string, 
        searchEnabled: boolean, 
        currentSearchQuery: string
        entriesPerPage: number,
        entryType: string,
        searchRedirect: string // The url which pressing enter

    }) {
    /*
    The main class for viewing quiz results.

    Contains search functionality, page view, etc.
    
    type: String -> represents what kind of QuizResult entries are being listed. Stores the api
    */

    const [quizResultList, setQuizResultList] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPages, setMaxPages] = useState<number>(0);




    const loadEntries = async () => {

        const session = await getSession();
        if (!session) return;

        console.log(currentSearchQuery.length)



        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${apiCall}?pageRequested=${currentPage}&entriesPerPage=${entriesPerPage}`;
        if (currentSearchQuery.length !== 0) url = url + `&searchParam=${currentSearchQuery}`


        
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session?.idToken}`,
                    "Content-Type": "application/json"

                }
            }
        )

        if (!res.ok) {
            console.error(`History fetch failed: ${res.status}`);
            setQuizResultList([]);
            setMaxPages(0);
            return;
        }

        const result = await res.json();
        console.log(result)
        setQuizResultList(result.entries ?? []);
        setMaxPages(Math.ceil((result.numberOfEntries ?? 0) / entriesPerPage));
    }


    useEffect(() => { // Whenever the page number or search query is changed, fetch the appropriate QuizResults
        loadEntries();
    }, [currentPage])

    useEffect(() => {loadEntries()}, [])


    

    return (
        <div className="w-full">
            <CurrentPageContext.Provider value={{currentPage, setCurrentPage, maxPages, setMaxPages}}>
                <header>
                    <h1>Current Page: {currentPage}</h1>
                    <h1>Max Pages: {maxPages}</h1>
                    
                    

                </header>

                <section className="mb-2">

                    { searchEnabled && <Search 
                    placeholderMessage="Search by title"
                    redirectLink={searchRedirect}
                    beginningValue={`${currentSearchQuery}`.replaceAll("%20", " ")}/> 
                    }

                </section>

                <section className="sm:flex flex justify-center items-center">

                    <PageSelect/>



                    <div className="flex-1"/>
                    
                    <ForwardBackArrowButtons/>
                    
                    
                </section>


                <main>
                    {entryType === "quizResultHistory" && <QuizResultList quizResultList={quizResultList}/>}
                    {entryType === "quizGrid" && <QuizList quizList={quizResultList}/>}
                </main>

            </CurrentPageContext.Provider>
            
        </div>

    )
}