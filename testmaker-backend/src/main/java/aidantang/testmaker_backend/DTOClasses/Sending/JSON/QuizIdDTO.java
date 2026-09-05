package aidantang.testmaker_backend.DTOClasses.Sending.JSON;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizIdDTO {
    /*
    A data transfer object that returns the ID of a quiz.
    Designed to be returned by the backend to the frontend.

    The original intention of this class is to give the ID of the new quiz 
    to the frontend when the user creates a new quiz
     */

    private String quizId;
    
}
