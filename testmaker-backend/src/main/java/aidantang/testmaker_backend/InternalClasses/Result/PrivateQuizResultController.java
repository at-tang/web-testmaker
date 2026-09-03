package aidantang.testmaker_backend.InternalClasses.Result;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz.EvaluateQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultDTO;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/private/result")
public class PrivateQuizResultController {

    private final QuizResultService quizResultService;

    public PrivateQuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<QuizResultDTO> evaluateQuizPrivate(Authentication auth, @RequestBody EvaluateQuizDTO dto) {
        return quizResultService.evaluateQuiz(auth, dto);
    }

    @GetMapping("/get/{quizId}")
    public ResponseEntity<QuizResultDTO> getQuizResult(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizResultService.getQuizResult(auth, quizId);
    }

    
    
}
