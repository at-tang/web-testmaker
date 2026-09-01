package aidantang.testmaker_backend.InternalClasses.Quiz;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.CreateQuiz.NewQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/private/quiz")
public class PrivateQuizController {

    private final QuizService quizService;

    
    public PrivateQuizController(QuizService quizService) {
        this.quizService = quizService;

    }

    @GetMapping("/get/list/self")
    public ResponseEntity<List<DisplayQuizDTO>> getQuizListBySelf(Authentication auth) {
        return quizService.getQuizListBySelf(auth);
    }

    @GetMapping("/edit/{quizId}")
    public ResponseEntity<UpdatingQuizDTO> editQuiz(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizService.editQuiz(auth, quizId);
    }

    @GetMapping("/get/play/{quizId}")
    public ResponseEntity<QuizDTO> loadQuizPrivate(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizService.loadQuizPrivate(quizId, auth);
    }

    @PostMapping("/create")
    public ResponseEntity<QuizDTO> createQuiz(Authentication auth, @RequestBody NewQuizDTO newQuizDTO) {
        return quizService.createQuiz(auth, newQuizDTO);
        
    }

    @PutMapping("/update")
    public ResponseEntity<QuizDTO> updateQuiz(Authentication auth, @RequestBody UpdatingQuizDTO quizDTO) {
        return quizService.updateQuiz(auth, quizDTO);
    }

    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<Void> deleteQuiz(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizService.deleteQuiz(auth, quizId);
    } 

    

    
    
}



