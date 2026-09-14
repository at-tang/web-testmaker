package aidantang.testmaker_backend.InternalClasses.Comment.CommentServices;


import aidantang.testmaker_backend.InternalClasses.Answer.AnswerRepository;

import java.time.Instant;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.InternalClasses.Comment.Comment;
import aidantang.testmaker_backend.InternalClasses.Comment.CommentRepository;
import aidantang.testmaker_backend.InternalClasses.Comment.CommentStatusEnum;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Receiving.NewCommentDTO;
import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending.CommentDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service 
public class CommentPostService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    public CommentPostService(CommentRepository commentRepository, UserRepository userRepository, QuizRepository quizRepository) {
        this.commentRepository = commentRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;

    }

    @Transactional 
    public ResponseEntity<CommentDTO> addComment(Authentication auth, NewCommentDTO newComment) {
        // Creates a new comment that is NOT a reply to another comment


        // Returns a ResponseEntity containing the created Comment

        // Returns 400 if it has been less than two minutes since the user last posted a comment (prevent spam)
        // Returns 401 if the user is not authenticated
        // Reutrns 404 if neither the user nor quiz can be found in the database
        // Returns 404 if this comment is a reply to another comment, but the parent comment cannot be found
        // Returns 200 if successful

        String quizId = newComment.getQuizId();

        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isEmpty()) return ResponseEntity.notFound().build();

        // Reject the request if the user has recently posted a comment in the last two minutes
        // Done to prevent spam
        if (user.getComments().size() != 0) {
            Long lastComment = user.getComments().getLast().getDatePosted();
            Long current = Instant.now().getEpochSecond();

            if (Math.abs(current - lastComment) <= 120 && !(user.getRoles().contains("ROLE_ADMIN"))) {
                return ResponseEntity.badRequest().build();
            }
        }

        Comment comment = new Comment(newComment, user, quiz.get());
    


        // If the comment being added is a REPLY, add that comment to the parent comment's list of replies
        if (newComment.getParentCommentId() != -1) {
            Optional<Comment> originalComment = commentRepository.findById(newComment.getParentCommentId());
            if (originalComment.isEmpty()) return ResponseEntity.notFound().build();
            else {
                comment.setParent(originalComment.get());
                originalComment.get().getReplies().addLast(comment);

            }
        }

        quiz.get().getComments().addFirst(comment);
        user.getComments().addFirst(comment);

        commentRepository.save(comment);

        CommentDTO result = new CommentDTO(comment);
        return ResponseEntity.ok(result);
   
    }


    @Transactional 
    public ResponseEntity<Void> deleteCommentUser(Authentication auth, Long commentId) {
        // Set a comment to be deleted. Activated by the user posting the comment.
        // Comments are only "soft-deleted". When deleted, they will not render their content

        // Returns 404 if neither the comment nor user can be found
        // Returns 401 if the user deleting the comment is not the owner of the comment
        // Reutrn 200 if successful

        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        Optional<Comment> toDelete = commentRepository.findById(commentId);
        if (toDelete.isEmpty()) return ResponseEntity.notFound().build();

        // If the attached user id in the comment is not equivalent to the
        // user who is attempting to delete the comment, return 401 (unauthorized)
        if (toDelete.get().getUser().getId() != user.getId()) {
            return ResponseEntity.status(401).build();
        }

        toDelete.get().setStatus(CommentStatusEnum.DELETED_BY_USER);

        commentRepository.save(toDelete.get());
        return ResponseEntity.ok().build();
    }


    @Transactional 
    public ResponseEntity<Void> hardDeleteComment(Authentication auth, Long commentId) {
        // A method to PERMANENTLY delete a comment
        // Can only be used by admin

        commentRepository.deleteById(commentId);
        return ResponseEntity.ok().build();
    }


    
}
