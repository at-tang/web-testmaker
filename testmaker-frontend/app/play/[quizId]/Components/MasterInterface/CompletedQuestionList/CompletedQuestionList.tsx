import { useContext } from "react";
import { CurrentQuestionIndexContext, GivenAnswersContext } from "../../../page";

export default function CompletedQuestionList() {
    /*
    A grid that shows which questions have been completed and which have not
    */

    const [givenAnswers, setgivenAnswers] = useContext(GivenAnswersContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useContext(CurrentQuestionIndexContext);

    const jumpIndex = (i) => {
        setCurrentQuestionIndex(i);
    }

    if (givenAnswers != null) { return (
        <div className=" grid grid-cols-6 gap-2 w-max items-center justify-center transition ease-in-out">
            {givenAnswers.map((ga, index) => {
                let colour = "";

                if (ga.givenAnswers.length == 0 || ga.givenAnswers[0] == "") {
                    colour = " bg-red-500 "
                } else {
                    colour = " bg-green-600 "
                }

                if (currentQuestionIndex == index) {
                    colour += " border-2 border-white "
                }

                    return (
                        <>
                            <div className={colour + "h-8 w-8 block transition duration-400"}>
                                <div className={"flex items-center justify-center h-full w-full z-20 hover:cursor-pointer select-none"}
                                onClick={() => {jumpIndex(index)}}>
                                    {index + 1}

                                </div>
                                
                            </div>


                        </>
                    )
                

                


            })}

        </div>

    ) }
}