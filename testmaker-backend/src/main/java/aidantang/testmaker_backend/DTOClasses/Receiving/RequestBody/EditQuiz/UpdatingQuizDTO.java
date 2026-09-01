package aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingQuizDTO {
    /*
    The following will represent what is received from the frontend
    when the user chooses to update their quiz
     */

    private String id;

    private Boolean visible;
    private Boolean randomQuestionOrder;
    private String title;
    private String description;
    private List<String> tags;


    private List<QuestionDTO> questions;
    private String userId;
    private int time;

    public UpdatingQuizDTO(Quiz quiz) {
        this.id = quiz.getId();
        this.visible = quiz.getVisible();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.tags = quiz.getTags();
        this.userId = quiz.getUser().getId();
        this.time = quiz.getTime();
        this.randomQuestionOrder = quiz.isRandomQuestionOrder();

        
        this.questions = new ArrayList<QuestionDTO>();
        
        List<Question> originalQuestions = quiz.getQuestions();

        for (int i = 0; i < originalQuestions.size(); i++) {
            Question current = originalQuestions.get(i);
            QuestionDTO currentDTO = new QuestionDTO(current);
            this.questions.add(currentDTO);
        }
    }
    
}
