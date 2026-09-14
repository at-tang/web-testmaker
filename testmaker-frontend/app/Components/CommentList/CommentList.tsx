import { authGetFetch } from "@/app/api/ApiCall/fetch";
import { CommentClass } from "@/app/Types/types"
import { useEffect, useRef, useState } from "react";
import CommentSingle from "./Comment";
import TextButton from "../Buttons/TextButton";
import CreateComment from "./CreateComment";

export default function CommentList(
    {
        apiPath,
        quizId

    }:
    {
        apiPath: string,
        quizId?: string

    }
) {

    const [comments, setComments] = useState<Array<CommentClass>>([]);
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    const [totalComments, setTotalComments] = useState(0);

    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(false);
    const LIMIT = 10;

    const addReply = (commentsToUpdate: Array<CommentClass>, newComment: CommentClass, parentCommentId: number): Array<CommentClass> =>
        commentsToUpdate.map((comment) => {
            if (comment.id === parentCommentId) {
                return { ...comment, replies: [...comment.replies, newComment] };
            }

            return {
                ...comment,
                replies: addReply(comment.replies, newComment, parentCommentId)
            };
        });

    const addComment = (newComment: CommentClass, parentCommentId: number) => {
        if (newComment.id === undefined) return;

        if (parentCommentId !== -1) {
            setComments((previousComments) => addReply(previousComments, newComment, parentCommentId));
            return;
        }

        setComments((previousComments) => [newComment, ...previousComments]);
        setTotalComments((previousTotal) => previousTotal + 1);
    };

    const getComments = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setIsLoading(true);

        try {
            const response = await authGetFetch(`${apiPath}limit=${LIMIT}&offset=${offset}&timestamp=${currentTime}`, undefined, "GET");
            const nextComments = response.ok() && Array.isArray(response.result?.comments)
                ? response.result.comments
                : [];

            setTotalComments(response.result?.totalComments ?? 0);
            setComments((previousComments) => previousComments.concat(nextComments));
            setOffset((previousOffset) => previousOffset + nextComments.length);
        } finally {
            loadingRef.current = false;
            setIsLoading(false);
        }

    }

    useEffect(() => {

        getComments();

    }, [])

    useEffect(() => {
        console.log(comments);
    }, [comments])



    return (

        <main>
            <h1 className="text-3xl">{totalComments} Comments</h1>
            <p className="mb-2">Sorted by Newest First</p>

            {quizId !== undefined && <CreateComment quizId={quizId} onCommentCreated={addComment}/>} 
            <div className="mb-6"/>

            <div className=" flex flex-col">

                {comments.map((comment, i) => {
                    return (
                        <div key={i} className="mb-2">
                            <CommentSingle comment={comment} onCommentCreated={addComment}/>
                        </div>
                    )
                })}
            </div>

            {
            comments.length < totalComments &&
            <div className="flex justify-center">
                <TextButton
                    text={isLoading ? "Loading Comments..." : "Load More Comments"}
                    clickFunction={getComments}
                />
            </div>
            }
        </main>
    )
}