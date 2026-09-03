package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.UserIdRequestBody;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;


@RestController
@RequestMapping("/api/public/quiz")
public class PublicQuizController {

    private final QuizRepository quizRepository;
    private final QuizService quizService;

    public PublicQuizController(QuizService quizService, QuizRepository quizRepository) {
        this.quizService = quizService;
        this.quizRepository = quizRepository;
    }

    @GetMapping("/get/play/{quizId}")
    public ResponseEntity<QuizDTO> loadQuiz(@PathVariable("quizId") String quizId) {
        return quizService.loadQuizPublic(quizId);
        
    }


    @GetMapping("get/view/single/{quizId}")
    public ResponseEntity<DisplayQuizDTO> getQuizPublic(@PathVariable("quizId") String quizId) {
        return quizService.getQuizPublic(quizId);
    }

    // Test method

    @GetMapping("test/{quizId}")
    public Quiz get(@PathVariable("quizId") String quizId) {
        return quizRepository.findById(quizId).get();
    }
    

    
}