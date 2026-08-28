import { useContext, useRef } from "react"
import { PortraitMetadataMenuContext, QuizContext } from "../../../page"
import TitleEdit from "./MenuComponents/TitleEdit";
import DescriptionEdit from "./MenuComponents/DescriptionEdit";
import TagEdit from "./MenuComponents/TagEdit/TagEdit";

export default function EditMetadataMenu() {

    const [quiz, setQuiz] = useContext(QuizContext)
    const [portraitMetadataMenu, setPortraitMetadataMenu] = useContext(PortraitMetadataMenuContext)


    return(
        <>
        <div className="fixed w-dvw h-dvh flex items-center justify-center bg-black sm:hidden">
            <div className="">
                <TitleEdit/>
                
                <DescriptionEdit/>

                <TagEdit/>
                <p>Test</p>
            </div>


        </div>
        </>
       
    )
}