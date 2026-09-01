package aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz;

import java.util.List;

import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluateQuizDTO {

    private QuizDTO quiz; // The quiz object is requested as the owner of the quiz may alter the quiz whole a user is playing it.
    // To store the version loaded onto the user's frontend is to get the version they are playing

    private List<GivenAnswerDTO> allGivenAnswers; // In format {"true", "Paris|Marseilles"}

    private List<QuestionDTO> allQuestions;


    
}
