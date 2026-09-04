package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionDTO {

    private String id;
    private int number;
    private String description;
    private String type;
    private String hint;
    private String explanation;
    private boolean caseSensitive;
    private List<AnswerDTO> answers;
    private List<String> correctAnswers = new ArrayList<String>();

    private int points;


    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.number = question.getNumber();
        this.description = question.getDescription();
        this.type = question.getType();
        this.hint = question.getHint();
        this.explanation = question.getExplanation();
        this.points = question.getPoints();
        this.caseSensitive = question.isCaseSensitive();
        this.correctAnswers = question.getCorrectAnswers();

        this.answers = new ArrayList<AnswerDTO>();
        
        List<Answer> originalAnswers = question.getAnswers();
        
        for (int i = 0; i < originalAnswers.size(); i++) {
            Answer current = originalAnswers.get(i);
            AnswerDTO currentDTO = new AnswerDTO(current);
            this.answers.add(currentDTO);
        }
    }
    
}
