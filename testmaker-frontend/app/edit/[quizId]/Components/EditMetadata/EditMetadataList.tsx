import SaveButton from "../Save/SaveButton";
import DescriptionEdit from "./Menu/MenuComponents/DescriptionEdit";
import RandomQuestionOrderEdit from "./Menu/MenuComponents/RandomQuestionOrderEdit";
import TagEdit from "./Menu/MenuComponents/TagEdit/TagEdit";
import TimeEdit from "./Menu/MenuComponents/TimeEdit";
import TitleEdit from "./Menu/MenuComponents/TitleEdit";
import VisibleEdit from "./Menu/MenuComponents/VisibleEdit";

export default function EditMetadataList() {

    return (
        <>
            <SaveButton/>
            <div className="mb-4"/>
            <div className="mb-8 bg-container p-4 rounded-2xl">
                <h1 className="text-4xl font-serif mb-1">Edit Metadata</h1>
                <hr className="h-[1px] bg-white w-24 mb-3"/>

                

                <TitleEdit/>
                <DescriptionEdit/>
                <div className="mb-4"/>

                <VisibleEdit/>
                <RandomQuestionOrderEdit/>
                <TimeEdit/>
                

                   

            </div>
        </>
    )
}