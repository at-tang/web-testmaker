"use client"
import Image from "next/image"
import magnifyingGlass from "../../../public/magnifyingGlass.svg"
import pencil from "../../../public/pencil.svg"
import time from "../../../public/time.svg"
import ToolbarButton from "./ToolbarButton"

export interface Links {
    iconLink: string,
    redirectLink: string,
    hoverText: string

}

export default function Toolbar() {

    const links: Array<Links> = [
        {
            iconLink: "/home.svg",
            redirectLink: "/home",
            hoverText: "Home"
        },

        {
            iconLink: "/pencil.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "My Quizzes"
        },

        {
            iconLink: "/magnifyingGlass.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "Search"
        },

        {
            iconLink: "/time.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "History"
        },

        {
            iconLink: "/user.svg",
            redirectLink: "/self/my-quizzes",
            hoverText: "My Profile"
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
        </>
    )
}