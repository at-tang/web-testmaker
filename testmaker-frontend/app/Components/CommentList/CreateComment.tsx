import { useEffect, useState } from "react";
import TextButton from "../Buttons/TextButton";
import { getSession } from "next-auth/react";
import { authGetFetch } from "@/app/api/ApiCall/fetch";
import { useRouter } from "next/navigation";
import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import { CommentClass } from "@/app/Types/types";

export default function CreateComment({quizId, parentCommentId = -1, onCommentCreated}: {
    quizId: string,
    parentCommentId?: number,
    onCommentCreated?: (comment: CommentClass, parentCommentId: number) => void
}) {

    const [expand, setExpand] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [submitActive, setSubmitActive] = useState(true);

    const [content, setContent] = useState("");
    const router = useRouter();

    const submitComment = async () => {
        if (content.length > 255) {
            setErrorText("Your comment can only have up to 255 characters.")
            return
        }
        if (content.length === 0) {
            setErrorText("Please enter your comment first.")
            return;
        }

        let newComment = {
            content: content,
            parentCommentId: parentCommentId,
            quizId: quizId
        }

        setSubmitActive(false);


        try {
            const session = await getSession();
            if (!session) {
                setErrorText("You must be logged in to comment.")
                setSubmitActive(true);
                return
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/private/comment/create`, 
                {
                    method: "POST",
                    headers: {
                            "Authorization": `Bearer ${session.idToken}`,
                            "Content-Type": "application/json" 
                    },
                    body: JSON.stringify(newComment)
                }
            )

            if (!response.ok) {
                if (response.status === 400) {
                    setErrorText("You must wait two minutes in between posting comments.")
                    setSubmitActive(true)
                    return
                } else {
                    router.push(ErrorReroute(response.status))
                }

            }

            const createdComment = await response.json() as CommentClass;
            createdComment.quizId = quizId;
            onCommentCreated?.(createdComment, parentCommentId);
            setErrorText("Comment posted successfully!");
            setContent("");
            setSubmitActive(true);
            setExpand(false)
        } 
        catch (error) {
            console.error(error);

        }
    }




    return (
        <main>

            <TextButton 
            clickFunction={() => setExpand((prev) => {return !prev})} 
            text={expand ? "Close" : (parentCommentId === -1 ? "Add Comment" : "Reply")}/>

            {
            expand &&
            <section>
                <textarea 
                placeholder="Type your comment here. Maximum 255 Characters."
                maxLength={255}
                value={content}
                onChange={(e) => {setContent(e.target.value)}}
                className="resize-none w-full rounded-2xl bg-white text-black p-3"
                />

                <div className="flex justify-center">
                    <TextButton text={submitActive ? "Submit" : "Submitting..."} clickFunction={() => {submitComment()}}/>
                </div>
                <p className={" text-center font-bold " + (errorText == "Comment posted successfully!" ? " text-green-600 " : " text-red-500 ")}>{errorText}</p>
            </section>

            }


        </main>

    )
}