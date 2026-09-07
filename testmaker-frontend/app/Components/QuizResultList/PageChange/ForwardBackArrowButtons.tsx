import { useContext } from "react"
import { CurrentPageContext } from "../QuizResultListMaster";

export default function ForwardBackArrowButtons() {

    const {currentPage, setCurrentPage, maxPages} = useContext(CurrentPageContext);

    const handleClick = (forward: boolean) => {
        if (forward) { // If the second button is pressed, incrementing page by 1
            if (currentPage < maxPages) {
                setCurrentPage((prev) => prev + 1)
            }

        }

        else { // If decrementing page
            if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1)
            }


        }
    }

    return (
        <div className="flex justify-center sm:mt-0 mt-2">
            <button className="border-2 border-white rounded-2xl h-8 sm:w-24 w-1/2 text-xl hover:scale-102 hover:cursor-pointer mr-2" onClick={() => {handleClick(false)}}>{`<`}</button>
            <button className="border-2 border-white rounded-2xl h-8 sm:w-24 w-1/2 text-xl hover:scale-102 hover:cursor-pointer sm:mr-2" onClick={() => {handleClick(true)}}>{`>`}</button>
        </div>
    )
}