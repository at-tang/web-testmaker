package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class QuizListDTO {
    /*
    This DTO class encapsulates what is returned when the user requests for multiple quizzes
     */

    private int numberOfEntries;
    private List<DisplayQuizDTO> quizzes;
}
