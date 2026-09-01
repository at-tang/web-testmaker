package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Result.QuestionResult;
import aidantang.testmaker_backend.InternalClasses.Result.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizResultDTO {

    private String id;


    private String quizId;

    private String title;
    
    private List<QuestionResult> questionResults;

    private int pointsObtained;
    private int pointsTotal;

    private String userId;
    private String dateAttempted;

    public QuizResultDTO(QuizResult q) {
        this.id = q.getId();
        this.quizId = q.getQuizId();
        this.title = q.getQuizTitle();
        this.pointsObtained = q.getPointsObtained();
        this.pointsTotal = q.getPointsTotal();
        this.userId = q.getUser().getId();
        this.dateAttempted = q.getDateAttempted();

        this.questionResults = q.getQuestionResults();

    
    }

}
