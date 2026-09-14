package aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Sending;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class GetCommentsByQuizDTO {
    private Long totalComments; // How many comments has this quiz been given
    private List<CommentDTO> comments; // All the comments on this quiz;
    
}
