package aidantang.testmaker_backend.DTOClasses.Sending;

import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import lombok.Data;

@Data
public class AnswerDTO {

    private String id;
    private Boolean correct;
    private String content;
    private String explanation;
    private String questionId;

    public AnswerDTO(Answer answer) {
        this.id = answer.getId();
        this.correct = answer.isCorrect();
        this.content = answer.getContent();
        this.explanation = answer.getExplanation();
        this.questionId = answer.getQuestion().getId();
    }
}
