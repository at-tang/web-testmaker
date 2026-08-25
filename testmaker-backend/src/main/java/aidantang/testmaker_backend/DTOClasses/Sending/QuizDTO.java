package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.DTOClasses.Receiving.NewQuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import lombok.Data;

@Data
public class QuizDTO {

    /*
    The following will represent what is given to the frontend
    when a user decides to play a quiz. 

    This is in contrast to the ViewQuizDTO, which only acts as a preview
    for the quiz with only basic metadata like Title, Description, and
    Owner.
     */

    private String id;

    private Boolean visible;
    private String title;
    private String description;
    private List<String> tags;

    private int totalRating;
    private int totalUsersRated;

    private int time;

    private List<QuestionDTO> questions;
    private String userId;

    public QuizDTO(Quiz quiz) {
        this.id = quiz.getId();
        this.visible = quiz.getVisible();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.tags = quiz.getTags();
        this.totalRating = quiz.getTotalRating();
        this.totalUsersRated = quiz.getTotalUsersRated();
        this.time = quiz.getTime();
        this.userId = quiz.getUser().getId();


        this.questions = new ArrayList<QuestionDTO>();
        
        List<Question> originalQuestions = quiz.getQuestions();

        for (int i = 0; i < originalQuestions.size(); i++) {
            Question current = originalQuestions.get(i);
            QuestionDTO currentDTO = new QuestionDTO(current);
            this.questions.add(currentDTO);
        }
    }

    

    

    
}
