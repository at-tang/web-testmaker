package aidantang.testmaker_backend.DTOClasses.Sending;

import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnswerDTO {

    private String id;
    private Boolean correct;
    private String content;
    private String explanation;
    private String questionId;

    public AnswerDTO(Answer answer) {
        this.id = answer.getId();
        this.correct = answer.isCorrect();
        this.content = answer.getContent().strip();
        this.explanation = answer.getExplanation().strip();
        this.questionId = answer.getQuestion().getId();
    }
}
