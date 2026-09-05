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
        <>
            <button onClick={() => {handleClick(false)}}>{`<`}</button>
            <button onClick={() => {handleClick(true)}}>{`>`}</button>
        </>
    )
}