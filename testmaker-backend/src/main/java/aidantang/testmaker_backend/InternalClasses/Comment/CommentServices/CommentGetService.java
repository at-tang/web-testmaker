package aidantang.testmaker_backend.InternalClasses.Comment.CommentServices;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.InternalClasses.Comment.Comment;
import aidantang.testmaker_backend.InternalClasses.Comment.CommentRepository;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending.CommentDTO;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending.GetCommentsByQuizDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import jakarta.transaction.Transactional;

@Service 
public class CommentGetService {

    private final QuizRepository quizRepository;
    private final CommentRepository commentRepository;

    public CommentGetService(CommentRepository commentRepository, QuizRepository quizRepository) {
        this.commentRepository = commentRepository;
        this.quizRepository = quizRepository;
    }

    @Transactional 
    public ResponseEntity<GetCommentsByQuizDTO> getCommentsByQuiz(String quizId, int limit, int offset, Long timestamp) {

        // Retrieves all comments pertaining to a particular quiz, identified by its quiz id (quizId)
        // Returns a GetCommentsByQuizDTO

        /*
        getAllCommentsByQuiz: ResponseEntity<GetCommentsByQuizDTO>
        Retrieves a list of all comments that pertain to a particular quiz, identified by its quiz id (quizId)
        Returns a specificed number of comments, indicated by the variable limit. Also returns te total number of comments
        (excludes replies) belonging to the quiz.

        GetCommentsByQuizDTO 
            totalComments: Long - represents how many comments belong to the quiz (only non-replies)
            comments: List<CommentDTO> - all the comments

        Status Codes:
        Returns 400 (Bad Request) if limit > 100 or limit < 1
        Returns 404 (Not Found) if no quiz exists with the quizId given
        Returns 200 upon a successful request
        
        */
        // timestamp is when the user first accessed this page in seconds since epoch
        // Used so that duplicate comments are not requested, which may be caused by a user creating a comment which places all other comments up an index

        if (limit > 100 || limit < 1 || offset < 0) return ResponseEntity.badRequest().build();
    

        List<Comment> comments = commentRepository.getAllCommentsByQuiz(quizId, offset, limit, timestamp);

        List<CommentDTO> result = new ArrayList<>();
        for (Comment c : comments) {
            result.add(new CommentDTO(c));
        }
        Long totalComments = commentRepository.countAllCommentsByQuiz(quizId);
        return ResponseEntity.ok(new GetCommentsByQuizDTO(totalComments, result));

        
    }


    
}
