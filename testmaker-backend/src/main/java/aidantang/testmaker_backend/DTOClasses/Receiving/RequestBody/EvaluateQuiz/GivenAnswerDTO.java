package aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GivenAnswerDTO {
    private String questionId;
    private List<String> givenAnswers;
}
