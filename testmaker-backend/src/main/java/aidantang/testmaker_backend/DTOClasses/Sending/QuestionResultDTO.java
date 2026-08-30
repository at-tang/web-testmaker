package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionResultDTO {
    private String title;
    private String description;
    private String explanation;

    private List<String> givenAnswers;
    private List<String> correctAnswers;

    private Boolean correct;
    
}
