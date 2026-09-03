import { useContext } from "react";
import { MenuVisibleContext } from "./MenuButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function MainMenu() {
    const [menuVisible, setMenuVisible] = useContext(MenuVisibleContext);

    const pressLink = (link: string) => {
        setMenuVisible(false);
        redirect(link);
        
    }

    return (
        <div className="fixed z-20 bg-black w-dvw h-dvh">
            <div className="w-full h-full flex items-center justify-center">
                <div className="block w-64">

                    <h1 className="w-full text-center text-5xl mb-2">Testmaker</h1>
                    <p className="text-xs mb-8 text-center">This is a Work-in-Progress. The following is not indicative of a final product.</p>

                    <button onClick={() => {pressLink("/home")}} className="block w-full text-3xl hover:cursor-pointer">
                    HOME
                    </button>

                    <hr/>

                    <button onClick={() => {pressLink("/self/my-quizzes")}} className="block w-full text-3xl hover:cursor-pointer">
                    MY QUIZZES
                    </button>

                    <hr/>

                    <button onClick={() => {pressLink("/self/my-quizzes")}} className="block w-full text-3xl hover:cursor-pointer">
                    SEARCH
                    </button>

                    <hr/>

                    <button onClick={() => {pressLink("/self/my-quizzes")}} className="block w-full text-3xl hover:cursor-pointer">
                    HISTORY
                    </button>




                </div>
                

            </div>


                


        </div>
    )
}