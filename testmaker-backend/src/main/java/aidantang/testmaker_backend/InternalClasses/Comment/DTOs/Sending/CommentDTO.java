package aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Comment.Comment;
import aidantang.testmaker_backend.InternalClasses.Comment.CommentStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class CommentDTO {
    /*
    A Data Transfer Object for a singular comment. 
     */
    private String userId;
    private String quizId;
    private String userName;
    private String content;
    private boolean deleted; // Is the comment deleted? If deleted, it renders slightly differently
    private Long id;
    private List<CommentDTO> replies;
    private int depth; // Depth is how many comments is this partricular comment nested in (starts at 0)
    private Long datePosted;
    
    public CommentDTO(Comment comment) {
        this.quizId = comment.getQuiz().getId();
        this.userId = comment.getUser().getId();
        this.userName = comment.getUser().getDisplayName();

        if (comment.getStatus() == CommentStatusEnum.DELETED_BY_USER || comment.getStatus() == CommentStatusEnum.DELETED_BY_ADMIN) {
            this.content = "This comment was deleted.";
            this.deleted = true;
        } else {
            this.content = comment.getContent();
            this.deleted = false;
        }

        this.id = comment.getId();
        this.datePosted = comment.getDatePosted();
        this.depth = 0;

        this.replies = new ArrayList<>();
        for (Comment c : comment.getReplies()) {
            this.replies.add(new CommentDTO(c, 1));
      
        }
    }

    public CommentDTO(Comment comment, int depth) {
        this.quizId = comment.getQuiz().getId();
        this.userId = comment.getUser().getId();
        this.userName = comment.getUser().getDisplayName();

        if (comment.getStatus() == CommentStatusEnum.DELETED_BY_USER || comment.getStatus() == CommentStatusEnum.DELETED_BY_ADMIN) {
            this.content = "This comment was deleted.";
            this.deleted = true;
        } else {
            this.content = comment.getContent();
            this.deleted = false;
        }

        this.id = comment.getId();
        this.datePosted = comment.getDatePosted();
        this.depth = depth;

        this.replies = new ArrayList<>();
        for (Comment c : comment.getReplies()) {
            this.replies.add(new CommentDTO(c, depth + 1));
        }
    }


}
