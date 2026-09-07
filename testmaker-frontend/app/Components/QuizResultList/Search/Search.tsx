import { Dispatch, SetStateAction, useContext, useRef, useState } from "react"
import { CurrentPageContext } from "../QuizResultListMaster"
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Search(
    {
    placeholderMessage,
    redirectLink,
    beginningValue
    }: 
    {
        placeholderMessage: string, // The placeholder message of the input section
        redirectLink: string, // The link that the user will be redirected to when they press "Enter"
        beginningValue: string // The value the input will begin with. Generally the previous search.
    }) 
    {

    const inputRef = useRef();

    const [searchQuery, setSearchQuery] = useState(beginningValue);




    const handleEnterClick = () => {
        redirect(redirectLink + inputRef.current.value);
    }

    return (
        <div className="border-white h-10 border-2 rounded-2xl flex items-center">
            <Image className="w-6 mr-4 ml-4" src="/magnifyingGlass.svg" width={5} height={5} alt=""/>
            <input 
            ref={inputRef}
            placeholder={placeholderMessage}
            maxLength={60}
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
            className="w-full select-none text-xl"
            >
                

            </input>

            <button onClick={() => {handleEnterClick()}}className="h-full border-l-2 border-white rounded-2xl rounded-r-xl px-12 hover:bg-white hover:text-black transition ease-in-out hover:cursor-pointer">Enter</button>
        </div>
    )
}