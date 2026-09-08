"use client"
import { useEffect, useState } from "react";
import Search from "../Components/QuizResultList/Search/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { ErrorReroute } from "../api/ErrorPageRereouting/ErrorRerouting";
import Searchbar from "./Components/searchbar";
import QuizList from "../Components/QuizList/QuizList";
import PageSelect from "./Components/PageChange/PageSelect";
import ForwardBackArrowButtons from "./Components/PageChange/ForwardBackArrowButtons";
import SortSelect from "./Components/SortSelect";

export default function SearchPage() {
    /*
    Represents the page where users can search for a quiz
    based on certain parameters
    */

    const router = useRouter();

    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page_requested")) || "1");
    const [sortType, setSortType] = useState(searchParams.get("sort") || "top");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search_param") || "");
    const [maxPages, setmaxPages] = useState(0);
    const [quizzes, setQuizzes] = useState([]);
    
    const ENTRIES_PER_PAGE = 6;

    const sortTypes: Record<string, string> = {
        "top": "Sort by: Most Plays",
        "likes": "Sort by: Most Likes",
        "recent": "Sort by: Recently Updated"
    }



    const searchQuizzes = async () => {
        try {
            const session = await getSession();
            if (!session) return

            const response = await fetch(urlConstructor(), 
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${session?.idToken}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            if (!response.ok) {
                router.replace(ErrorReroute(response.status)); // Redirect if something goes wrong
                return;
            }

            const result = await response.json();
            console.log(result)
            setQuizzes(result.quizzes);
            setmaxPages(Math.ceil(result.numberOfEntries / ENTRIES_PER_PAGE));
        }

        catch (error) {
            console.error(error);
            
        }
    }

    const urlConstructor = () => {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/quiz/get/view/list/search?page_requested=${currentPage}&entries_per_page=${ENTRIES_PER_PAGE}&sort=${sortType}`
        if (searchQuery !== "") url = url + `&search_param=${encodeURIComponent(searchQuery)}`
        return url;
    }

    const frontendUrlConstructor = () => {
        let url = `/search?entries_per_page=${ENTRIES_PER_PAGE}&page_requested=${currentPage}&sort=${sortType}`
        if (searchQuery !== "") url = url + `&search_param=${encodeURIComponent(searchQuery)}`
        return url;

    }

    useEffect(() => {
        searchQuizzes();
        router.push(frontendUrlConstructor());
        router.refresh();
    }, [currentPage, searchQuery, sortType])

    useEffect(() => {
        
    }, [currentPage, searchQuery, sortType])

    useEffect(() => {
        console.log(quizzes)
    }, [quizzes])



    


    return (
        <div className="p-4">
            <header className="sticky top-0 bg-background border-b-2 border-white">
                <Searchbar 
                placeholder="Search for quizzes"
                redirectLink={`/search?page_requested=${currentPage}&sort=${sortType}&entries_per_page=${ENTRIES_PER_PAGE}&search_param=`}
                valueChanged={searchQuery}
                setValueChanged={setSearchQuery}
                />

                <div className="sm:flex mt-2">
                    <PageSelect
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPages={maxPages}/>

                    <div className="mr-2 sm:block hidden"/>

                    <SortSelect
                    valueChanged={sortType}
                    setValueChanged={setSortType}
                    options={sortTypes}
                    />

                    <div className="flex-1"/>

                    <ForwardBackArrowButtons
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPages={maxPages}/>

                    <div className="mb-4"/>
                </div>

            </header>


            <QuizList quizList={quizzes}/>

            
        </div>
    )

}