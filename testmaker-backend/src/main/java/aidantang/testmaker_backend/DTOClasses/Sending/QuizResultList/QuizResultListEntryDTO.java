package aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList;

import java.util.ArrayList;

import aidantang.testmaker_backend.InternalClasses.Result.QuestionResult;
import aidantang.testmaker_backend.InternalClasses.Result.QuizResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class QuizResultListEntryDTO {
    /*
    Represents one entry within a list of QuizResults.

    Seen when user enters their "History page" where they can 
    see all their attempts at any quiz.

    The differentiating factor between this class and QuizResultDTO
    is that it does not contain how users did at each specific question
    (or List<QuestionResultDTO>). As such, this class is far lighter than
    QuizResultDTo, and makes it optimal for sending in bulk. 

    May be utilized in the future to implement a feature where
    users can see their previous attempts at a quiz when they enter
    its page.
     */

    private String id;
    private String quizId;
    private String title;
    private int pointsObtained;
    private int pointsTotal;
    private String userId;
    private String dateAttempted;

    public QuizResultListEntryDTO(QuizResult q) {
        this.id = q.getId();
        this.quizId = q.getQuizId();
        this.title = q.getQuizTitle();
        this.pointsObtained = q.getPointsObtained();
        this.pointsTotal = q.getPointsTotal();
        this.userId = q.getUser().getId();
        this.dateAttempted = q.getDateAttempted();
    
    }
}
