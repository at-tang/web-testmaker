import { useContext } from "react"
import { PortraitMetadataMenuContext } from "../../page"

export default function OpenEditMetadataMenu() {

    const [portraitMetadataMenu, setPortraitMetadataMenu] = useContext(PortraitMetadataMenuContext)


    return(
        <>
            <button
            onClick={() => {
                setPortraitMetadataMenu(true)
            }}
            className=" fixed right-0 top-12 sm:hidden 
                        text-black
                        h-8 w-8 bg-white rounded-l-full
                        hover:cursor-pointer hover:brightness-75">
                V
            </button>
        </>
    )
}