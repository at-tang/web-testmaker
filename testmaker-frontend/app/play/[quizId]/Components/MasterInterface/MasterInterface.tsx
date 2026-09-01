import CompletedQuestionList from "./CompletedQuestionList/CompletedQuestionList";
import MoveButtons from "./Components/MoveButtons/MoveButtons";
import QuestionDisplay from "./Components/Question/QuestionDisplay";
import SubmitButton from "./Components/SubmitButton/SubmitButton";

export default function MasterInterface() {

    return (
        <>
            <div className="p-2 border-white border-2">
                <QuestionDisplay/>

                <MoveButtons/>

                <SubmitButton/>

                <CompletedQuestionList/>

            </div>
        </>
    )

}