"use client"
import Image from "next/image"
import magnifyingGlass from "../../../public/magnifyingGlass.svg"
import pencil from "../../../public/pencil.svg"
import time from "../../../public/time.svg"
import ToolbarButton from "./ToolbarButton"
import Popup from "../Popup/Popup"

export interface Links {
    iconLink: string,
    redirectLink: string,
    hoverText: string

}

export default function Toolbar() {

    // Use this to alter what buttons appear on the toolbar and where they link to
    const links: Array<Links> = [

        {
            iconLink: "/magnifyingGlass.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "Search: Look for quizzes to play"
        },

        {
            iconLink: "/add.svg",
            redirectLink: "/edit/newquiz",
            hoverText: "Create New Quiz"
        },

        {
            iconLink: "/pencil.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "My Quizzes: View all the quizzes you made"
        },    

        {
            iconLink: "/time.svg",
            redirectLink: "/self/history",
            hoverText: "History: See how you performed in all the tests you've taken"
        },

        {
            iconLink: "/user.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "My Profile: View your own profile"
        },

        {
            iconLink: "/exit.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "Logout (Currently Not Functional)"
        }


    ]

    const logoButton: Links = {
        iconLink: "/beta_logo.svg",
        redirectLink: "/home",
        hoverText: "Testmaker App (BETA)"
    }


    return (
        <>
            <div className="h-dvh sm:w-20 min-w-16 border-r-2 border-white justify-center">

                <div className="mb-6"/>

                <ToolbarButton info={logoButton}/>
                <div className="mb-6"/>



                {links.map((link, index) => {
                    return (

                            <ToolbarButton key={index} info={link}/>


                    )
                })}
        

            </div>

            <Popup/>
        </>
    )
}