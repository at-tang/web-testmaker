package aidantang.testmaker_backend.InternalClasses.Quiz;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizEditingService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizListService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizPlayService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizViewService;


@RestController
@RequestMapping("/api/public/quiz")
public class PublicQuizController {

    private final QuizRepository quizRepository;
    private final QuizService quizService;
    private final QuizEditingService quizEditingService;
    private final QuizListService quizListService;
    private final QuizPlayService quizPlayService;
    private final QuizViewService quizViewService;

    
    public PublicQuizController(
        QuizRepository quizRepository,
        QuizService quizService, 
        QuizEditingService quizEditingService,
        QuizListService quizListService,
        QuizPlayService quizPlayService,
        QuizViewService quizViewService) 
        {

        this.quizRepository = quizRepository;
        this.quizService = quizService;
        this.quizEditingService = quizEditingService;
        this.quizListService = quizListService;
        this.quizPlayService = quizPlayService;
        this.quizViewService = quizViewService;

    }


    @GetMapping("/get/play/{quizId}")
    public ResponseEntity<QuizDTO> loadQuiz(@PathVariable("quizId") String quizId) {
        return quizPlayService.loadQuizPublic(quizId);
    }

    @GetMapping("get/view/single/{quizId}")
    public ResponseEntity<DisplayQuizDTO> getQuizPublic(@PathVariable("quizId") String quizId) {
        return quizViewService.getQuizMetadataPublic(quizId);
    }

    // Test method

    @GetMapping("test/{quizId}")
    public Quiz get(@PathVariable("quizId") String quizId) {
        return quizRepository.findById(quizId).get();
    }
    

    
}