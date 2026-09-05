import CompletedQuestionList from "./Components/CompletedQuestionList/CompletedQuestionList";
import MoveButtons from "./Components/MoveButtons/MoveButtons";
import QuestionDisplay from "./Components/Question/QuestionDisplay";
import SubmitButton from "./Components/SubmitButton/SubmitButton";
import Timer from "./Components/Timer/Timer";

export default function MasterInterface() {

    return (
        <>
            <div className="p-2 border-white border-2">

                <Timer/> 
                
                <QuestionDisplay/>

                <MoveButtons/>

                <SubmitButton/>

                <CompletedQuestionList/>

            </div>
        </>
    )

}