import LikeButtonGrid from "./LikeButton";
import { DisplayQuiz } from "@/app/Types/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Quiz({quiz}: {quiz: DisplayQuiz}) {

    const handleNonButtonClick = (e) => {
        /*
        Handles all clicks to the object that isn't directly
        correlated with another buttom (like Play or Edit)
        */

        if (e.target === e.currentTarget) {
            redirect(`/quiz/view/${quiz.id}`)
        }
    }

    let size = " text-xl "

    if (quiz.title.length > 40) size = " text-sm "
    if (quiz.title.length > 20) size = " text-md "




    return (
        <>
            <div
            onClick={(e) => {handleNonButtonClick(e)}} 
             className="border-white border-2 h-72 w-72 hover:cursor-pointer rounded-2xl text-center" >
                    <div className="w-full h-40 bg-green-900 rounded-t-2xl border-b-2 border-white">
                        <Image src="/parthenon.svg" className=" w-full h-full object-cover rounded-t-2xl"  width={100} height={100} alt="Image" loading="eager"></Image>
                    </div>

                    <main className="px-2 pt-2 h-20">
                        <Link href={`/quiz/view/${quiz.id}`}>
                            <h1 className={size + "overflow-x-clip leading-5 font-bold mb-1"}>{quiz.title}</h1>
                            <div className="flex items-center justify-center">
                                <h2 className="">by: {quiz.ownerName}</h2>
                                {!quiz.visible &&
                                <>
   
                                    <Image src="/lock.svg" width={1} height={1} alt="Private" className="w-3 ml-2"/>
                                </>
                                }

                            </div>
                            
                        </Link>
                        

                    </main>

                    <menu className="flex justify-center h-12 rounded-b-2xl">

                        <LikeButtonGrid quiz={quiz}/>

                        <Link href={`/play/${quiz.id}`} className="ml-4 mr-2 hover:cursor-pointer hover:scale-105 transition ease-in-out">
                            <button className="rounded-full border-2 border-white w-9 h-9 flex items-center justify-center">
                            <Image className="w-5" src="/pencil.svg" width={1} height={1} alt="Play">
                            </Image>
                        </button>
                        </Link>

                        


                    {
                    quiz.ownQuiz && 
                    <>
                    <Link href={`/edit/${quiz.id}`} className=" hover:cursor-pointer hover:scale-105 transition ease-in-out mr-2">
                        <button className="rounded-full border-2 border-white w-9 h-9 flex items-center justify-center">
                            <Image className="w-5" src="/gear.svg" width={1} height={1} alt="Play">
                            </Image>
                        </button>
                    </Link>

                    <Link href={`/edit/${quiz.id}`} className=" hover:cursor-pointer hover:scale-105 transition ease-in-out">
                        <button className="rounded-full border-2 border-white w-9 h-9 flex items-center justify-center">
                            <Image className="w-5" src="/bin.svg" width={1} height={1} alt="Play">
                            </Image>
                        </button>
                    </Link>
                    </>

                    }

                    </menu>




                    



                    
            </div>
        </>
    )

}