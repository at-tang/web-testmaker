package aidantang.testmaker_backend.DTOClasses.Receiving;

import java.util.List;

import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class quizListDTO {
    private List<DisplayQuizDTO> quizzes;
}
