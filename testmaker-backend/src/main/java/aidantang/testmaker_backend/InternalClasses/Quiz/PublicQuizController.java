package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Receiving.LoadQuizRequestBody;
import aidantang.testmaker_backend.DTOClasses.Receiving.UserIdRequestBody;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;

@RestController
@RequestMapping("/api/public/quiz")
public class PublicQuizController {

    private final QuizService quizService;

    public PublicQuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/get/play")
    public ResponseEntity<QuizDTO> loadQuiz(@RequestBody LoadQuizRequestBody loadQuizRequestBody) {
        return quizService.loadQuiz(loadQuizRequestBody.getQuizId());
        
    }

    @GetMapping("get/list/user")
    public ResponseEntity<List<DisplayQuizDTO>> getQuizListByOtherUser(@RequestBody UserIdRequestBody userIdRequestBody) {
        return quizService.getQuizListByOtherUser(userIdRequestBody.getUserId());
    }

    
}