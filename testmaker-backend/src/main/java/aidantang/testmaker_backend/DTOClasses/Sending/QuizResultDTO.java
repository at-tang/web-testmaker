package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Result.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizResultDTO {


    private String quizId;
    private List<QuestionResultDTO> answers;

    private int pointsObtained;
    private int pointsTotal;

    private String userId;

}
