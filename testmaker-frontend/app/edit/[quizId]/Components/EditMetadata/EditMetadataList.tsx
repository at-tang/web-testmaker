import DescriptionEdit from "./Menu/MenuComponents/DescriptionEdit";
import RandomQuestionOrderEdit from "./Menu/MenuComponents/RandomQuestionOrderEdit";
import TagEdit from "./Menu/MenuComponents/TagEdit/TagEdit";
import TimeEdit from "./Menu/MenuComponents/TimeEdit";
import TitleEdit from "./Menu/MenuComponents/TitleEdit";
import VisibleEdit from "./Menu/MenuComponents/VisibleEdit";

export default function EditMetadataList() {

    return (
        <>
            <div className="mb-8">
                <TitleEdit/>
                <VisibleEdit/>
                <RandomQuestionOrderEdit/>
                <TimeEdit/>
                <DescriptionEdit/>

                   

            </div>
        </>
    )
}