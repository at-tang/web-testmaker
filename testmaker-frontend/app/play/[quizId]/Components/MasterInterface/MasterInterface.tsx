import BackButton from "@/app/Components/Buttons/BackButton";
import CompletedQuestionList from "./Components/CompletedQuestionList/CompletedQuestionList";
import MoveButtons from "./Components/MoveButtons/MoveButtons";
import QuestionDisplay from "./Components/Question/QuestionDisplay";
import SubmitButton from "./Components/SubmitButton/SubmitButton";
import Timer from "./Components/Timer/Timer";

export default function MasterInterface() {

    return (
        <>

            <div className="w-full h-dvh flex items-center justify-center scrollbar-thumb-white scroll-m-4">
                <div className="p-6 border-white border-2 rounded-2xl max-w-7/8 h-8/10 overflow-y-auto">

                    <BackButton/>
                    <div className="mb-2"/>

                    <div className="flex w-full justify-center"><Timer/></div>

                    <main className="my-4">
                        <QuestionDisplay/>

                    </main>
                    
                    
                   
                    <div className="w-full flex items-center justify-center flex-col gap-2 mb-6">
                        <CompletedQuestionList/>
                        <MoveButtons/>
                        
                    </div>

                    

                    <section className="flex justify-center">
                        <SubmitButton/>
                    </section>

                    
                    
                </div>

            </div>

        </>
    )

}