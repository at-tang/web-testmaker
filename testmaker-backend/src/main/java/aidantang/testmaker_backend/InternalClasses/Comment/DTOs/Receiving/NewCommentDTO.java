package aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Receiving;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class NewCommentDTO {
    private String content;
    private Long parentCommentId; // -1 if this comment is not a reply
    private String quizId; // Quiz that this comment belongs to 
}
