import { useContext, useEffect, useRef, useState } from "react";
import { CurrentPageContext } from "../QuizResultListMaster";

export default function PageSelect() {

    const {currentPage, maxPages, setCurrentPage} = useContext(CurrentPageContext);
    const inputRef = useRef();
    const [menuAppear, setMenuAppear] = useState(false);

    const handleButtonClick = () => {
        let page = inputRef.current.value
        if (page > maxPages) setCurrentPage(maxPages)
        else if (page < 1) setCurrentPage(1)
        else setCurrentPage(inputRef.current.value)

        inputRef.current.value = 1;

    }

    const handleClick = () => {
        setMenuAppear(true);
    }

    const handleExitButton = () => {

        setMenuAppear(false);
    }



    return (
        <>
            <div 
            onClick={() => {handleClick()}}
            className="border-2 border-white h-8 sm:w-32 w-full rounded-2xl text-center select-none hover:cursor-pointer hover:scale-102 transition ease-in-out">
                Page {currentPage}/{maxPages}


            {menuAppear && <div className="absolute bg-black text-white p-4 border-2 border-white rounded-2xl shadow-lg/50 mb-2 translate-y-2 z-50">

                <div className="flex justify-end">
                    <button onClick={(event) => { event.stopPropagation(); handleExitButton(); }} className="text-sm hover:cursor-pointer z-60">X</button>
                </div>


                <p>Go to page: </p>

                <input type="number"
                ref={inputRef}
                max={maxPages}
                min={1}
                className="bg-white text-black mb-2 w-full text-center"
                defaultValue={currentPage}
                >
                </input>

                <section className="flex justify-center">
                     <button onClick={() => {handleButtonClick()}}className="border-white px-4 py-1 border-2 rounded-2xl block">Enter</button>

                </section>

               

            </div>}

            </div>

        </>
    )

    

}