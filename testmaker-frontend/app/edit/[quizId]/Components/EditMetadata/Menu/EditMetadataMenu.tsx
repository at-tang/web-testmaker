import { useContext, useRef } from "react"
import { PortraitMetadataMenuContext, QuizContext } from "../../../page"
import TitleEdit from "./MenuComponents/TitleEdit";
import DescriptionEdit from "./MenuComponents/DescriptionEdit";
import TagEdit from "./MenuComponents/TagEdit/TagEdit";
import VisibleEdit from "./MenuComponents/VisibleEdit"
import TimeEdit from "./MenuComponents/TimeEdit";

export default function EditMetadataMenu() {

    const [quiz, setQuiz] = useContext(QuizContext)
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useContext(PortraitMetadataMenuContext)


    return(
        <>
        <div className="fixed w-dvw h-dvh flex items-center justify-center bg-black sm:hidden overflow-y-scroll">
            <div className="">

                <button onClick={() => setPortraitMetadataMenu(false)}
                    className="sm:hidden block text-lg
                               border-2 border-white px-4"
                >X</button>

                <VisibleEdit/> 

                <TitleEdit/>
                
                <DescriptionEdit/>

                <TagEdit/>

                <TimeEdit/>

            </div>


        </div>
        </>
       
    )
}