package aidantang.testmaker_backend.InternalClasses.Quiz;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.CreateQuiz.NewQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.JSON.QuizIdDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizEditingService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizListService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizPlayService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Services.QuizViewService;

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

    private final QuizEditingService quizEditingService;
    private final QuizService quizService;
    private final QuizListService quizListService;
    private final QuizPlayService quizPlayService;
    private final QuizViewService quizViewService;

    
    public PrivateQuizController(QuizService quizService, 
                                 QuizEditingService quizEditingService,
                                 QuizListService quizListService,
                                 QuizPlayService quizPlayService,
                                 QuizViewService quizViewService) {
        this.quizService = quizService;
        this.quizEditingService = quizEditingService;
        this.quizListService = quizListService;
        this.quizPlayService = quizPlayService;
        this.quizViewService = quizViewService;

    }



    // Editing Quizzes :=====================================================

    @GetMapping("/edit/{quizId}")
    public ResponseEntity<UpdatingQuizDTO> retrieveQuizToEdit(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizEditingService.retrieveQuizToEdit(auth, quizId);
    }

    @PutMapping("/update")
    public ResponseEntity<QuizDTO> updateQuiz(Authentication auth, @RequestBody UpdatingQuizDTO quizDTO) {
        return quizEditingService.updateQuiz(auth, quizDTO);
    }


    // Playing Quizzes :=====================================================

    @GetMapping("/get/play/{quizId}")
    public ResponseEntity<QuizDTO> loadQuizPrivate(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizPlayService.loadQuizPrivate(quizId, auth);
    }

    // Viewing a Quiz Metadata :============================================================

    @GetMapping("/get/view/single/{quizId}")
    public ResponseEntity<DisplayQuizDTO> getQuizMetadataPrivate(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizViewService.getQuizMetadataPrivate(auth, quizId);
    }

    
    // Retrieving Quiz Lists :=====================================================

    @GetMapping("/get/view/list/myquizzes")
    public ResponseEntity<List<DisplayQuizDTO>> getUserOwnQuizListByLastUpdated(Authentication auth) {
        return quizListService.getUserOwnQuizListByLastUpdated(auth);
    }


    // Miscellaneous :=====================================================

    @PostMapping("/create")
    public ResponseEntity<QuizIdDTO> createBlankQuiz(Authentication auth) {
        return quizService.createBlankQuiz(auth);
        
    }

    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<Void> deleteQuiz(Authentication auth, @PathVariable("quizId") String quizId) {
        return quizService.deleteQuiz(auth, quizId);
    } 

    

    
    
}



