import { authGetFetch, FetchResult } from "@/app/api/ApiCall/fetch";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizList from "../QuizList/QuizList";
import ForwardBackArrowButtons from "./Components/PageChange/ForwardBackArrowButtons";
import SortSelect from "./Components/SortSelect";
import PageSelect from "./Components/PageChange/PageSelect";
import Searchbar from "./Components/searchbar";

export default function QuizViewMaster(
    {
        apiCall = "api/private/quiz/get/view/list/search", 
        entriesPerPage = 3,
        searchEnabled = true,
        pageEnabled = true,
        sortEnabled = true
    }:
    {
        apiCall?: string // represents the specific API url that will request the appropiate quizzes (Must be GET)
        entriesPerPage?: number // How many quizzes should appear per page?,
        searchEnabled?: boolean,
        pageEnabled?: boolean,
        sortEnabled?: boolean
    }
) {
    /*
    QuizViewMaster is the "Master key" that runs the API call and handles all other
    components of the QuizView. 
    */

    // api/private/quiz/get/view/list/search

    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page_requested")) || 1);
    const [sortType, setSortType] = useState(searchParams.get("sort") || "top");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search_param") || "");

    const [maxPages, setmaxPages] = useState(0); // How many pages of quizzes are available?
    const [quizzes, setQuizzes] = useState([]);
    
    const ENTRIES_PER_PAGE = entriesPerPage || 3;

    // These are the following sort types accepted by the backend
    // Key represents what is internally used
    // Value is what is shown to the user as a more informative version of what the filter entails
    const sortTypes: Record<string, string> = {
        "top": "Sort by: Most Plays",
        "likes": "Sort by: Most Likes",
        "recent": "Sort by: Recently Updated"
    }

    const searchQuizzes = async () => {
        try {
            const session = await getSession();
            if (!session) return

            const res: FetchResult = await authGetFetch(urlConstructor(), session?.idToken, "GET");

            if (!res.ok()) {
                router.replace(ErrorReroute(res.status)); // Redirect if something goes wrong
                return;
            }

            const result = res.result;
            setQuizzes(result.quizzes);
            setmaxPages(Math.ceil(result.numberOfEntries / ENTRIES_PER_PAGE));
        }

        catch (error) {
            console.error(error);
            
        }
    }

    // Constructs a URL for fetch
    const urlConstructor = () => {
        let url = `${apiCall}?page_requested=${currentPage}&entries_per_page=${ENTRIES_PER_PAGE}&sort=${sortType}`
        if (searchQuery !== "") url = url + `&search_param=${encodeURIComponent(searchQuery)}`
        return url;
    }

    // Constructs the URL for the router
    const frontendUrlConstructor = () => {
        let url = `?entries_per_page=${ENTRIES_PER_PAGE}&page_requested=${currentPage}&sort=${sortType}`
        if (searchQuery !== "") url = url + `&search_param=${encodeURIComponent(searchQuery)}`
        return url;

    }

    // Reload the page everytime the user changes their search parameters
    useEffect(() => {
        searchQuizzes();
        router.push(frontendUrlConstructor());
        router.refresh();
    }, [currentPage, searchQuery, sortType])


    return (
        <>
            <header className="sticky top-0 bg-background border-b-2 border-white">

                { searchEnabled &&
                <Searchbar 
                placeholder="Search for quizzes"
                redirectLink={`?page_requested=${currentPage}&sort=${sortType}&entries_per_page=${ENTRIES_PER_PAGE}&search_param=`}
                valueChanged={searchQuery}
                setValueChanged={setSearchQuery}
                />
                }

                <menu className="sm:flex mt-2">
                    { pageEnabled &&
                    <>
                        <PageSelect
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        maxPages={maxPages}/>
                        

                        <div className="mr-4 sm:block hidden"/>

                        <ForwardBackArrowButtons
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        maxPages={maxPages}/>

                        <div className="mb-4"/>
                    </>
                    }


                    {sortEnabled &&
                    <>
                        <SortSelect
                        valueChanged={sortType}
                        setValueChanged={setSortType}
                        options={sortTypes}
                        />

                        <div className="flex-1 mb-6"/>
                    </>
                    }



                </menu>

            </header>


            <main>
                <QuizList quizList={quizzes}/>
            </main>


            <footer>

            </footer>

        </>

    )
}