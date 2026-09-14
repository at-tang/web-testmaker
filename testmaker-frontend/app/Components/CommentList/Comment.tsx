import { CommentClass } from "@/app/Types/types";
import { useState } from "react";
import TextButton from "../Buttons/TextButton";
import CreateComment from "./CreateComment";

export default function CommentSingle({comment, onCommentCreated}: {
    comment: CommentClass,
    onCommentCreated?: (comment: CommentClass, parentCommentId: number) => void
}) {

    const [expand, setExpand] = useState(false);

    return (
        <main className="">
            <div className="p-3 bg-container rounded-2xl max-w-96 mb-2.5">
                <p><b>{comment.userName}</b> - {new Date(comment.datePosted * 1000).toDateString()}</p>
                
                
                <p>{comment.content}</p>

                <div className="flex gap-4">

                    {(comment.replies.length > 0) &&
                        <TextButton text={expand ? "Close" : "See Replies"} clickFunction={() => {setExpand((prev) => {return !prev})}}/>}

                    <CreateComment
                        quizId={comment.quizId}
                        parentCommentId={comment.id}
                        onCommentCreated={onCommentCreated}
                    />
                </div>

            </div>


            {expand &&
                comment.replies.map((reply, i) => {
                    return (
                        <div key={i} className={comment.depth > 5 ? "" : "ml-6"}>
                            <CommentSingle comment={reply} onCommentCreated={onCommentCreated}/>
                        </div>
                        
                    )
                })
            }

        </main>
    )

}