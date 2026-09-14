package aidantang.testmaker_backend.InternalClasses.Comment.CommentControllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.InternalClasses.Comment.CommentServices.CommentGetService;
import aidantang.testmaker_backend.InternalClasses.Comment.CommentServices.CommentPostService;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Receiving.NewCommentDTO;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending.CommentDTO;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending.GetCommentsByQuizDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping("")
public class CommentController {

    private final CommentPostService commentPostService;
    private final CommentGetService commentGetService;

    public CommentController(CommentPostService commentPostService, CommentGetService commentGetService) {
        this.commentGetService = commentGetService;
        this.commentPostService = commentPostService;
    }


    @GetMapping("api/public/comment/quiz/get")
    public ResponseEntity<GetCommentsByQuizDTO> getCommentsByQuiz(
        @RequestParam(name="quiz_id", required=true) String quizId,
        @RequestParam(name="limit", required=false, defaultValue="10") int limit,
        @RequestParam(name="offset", required=false, defaultValue="0") int offset,
        @RequestParam(name="timestamp", required=true) Long timestamp
    ) {
        return commentGetService.getCommentsByQuiz(quizId, limit, offset, timestamp);
    }


    @PostMapping("api/private/comment/create")
    public ResponseEntity<CommentDTO> addComment(
        Authentication auth,
        @RequestBody NewCommentDTO newComment
    ) {
        return commentPostService.addComment(auth, newComment);  
    }


    @DeleteMapping("api/private/comment/delete")
    public ResponseEntity<Void> deleteCommentUser(
        Authentication auth,
        @RequestParam(name="comment_id") Long commentId
    ) {
        return commentPostService.deleteCommentUser(auth, commentId);
    }

    
    
}
