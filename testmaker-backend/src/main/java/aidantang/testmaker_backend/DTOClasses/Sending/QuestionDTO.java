package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import lombok.Data;

@Data
public class QuestionDTO {

    private String id;
    private int number;
    private String title;
    private String description;
    private String type;
    private String hint;
    private List<Answer> answers;

    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.number = question.getNumber();
        this.title = question.getTitle();
        this.description = question.getDescription();
        this.type = question.getType();
        this.hint = question.getHint();
        this.answers = question.getAnswers();
    }

    
}
