package aidantang.testmaker_backend.InternalClasses.Result;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Receiving.EvaluateQuizDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/private/result")
public class PrivateQuizResultController {

    private final QuizResultService quizResultService;

    public PrivateQuizResultController(QuizResultService quizResultService) {
        this.quizResultService = quizResultService;
    }

    @PostMapping("/private/evaluate")
    public ResponseEntity<String> evaluateQuizPrivate(Authentication auth, @RequestBody EvaluateQuizDTO dto) {
        return quizResultService.evaluateQuizPrivate(auth, dto);
    }
    
}
