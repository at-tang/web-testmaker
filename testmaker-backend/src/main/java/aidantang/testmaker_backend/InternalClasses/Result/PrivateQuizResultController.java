package aidantang.testmaker_backend.InternalClasses.Result;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz.EvaluateQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList.QuizResultList;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList.QuizResultListEntryDTO;

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

    // This function is called by default when the user wants to search through their own history of Quiz results
    // The function retrieves all results pertaining to the user by chronological order (most recent first)
    // The function can also filter through QuizResults by title, selecting only those that has the given keyword within their title
    @GetMapping("/get/list/general")
    public ResponseEntity<QuizResultList> getUserHistoryByPage(
        Authentication auth, 
        @RequestParam(name = "pageRequested") int pageRequested, 
        @RequestParam(name = "entriesPerPage") int entriesPerPage, 
        @RequestParam(name = "searchParam", required = false, defaultValue = "") String searchParam
        ) {

        String query = (searchParam == null || searchParam.isBlank() || "all".equalsIgnoreCase(searchParam)) ? "" : searchParam;
        return quizResultService.getUserQuizResultHistoryByPageFilterByQuizTitle(auth, pageRequested, entriesPerPage, query);
    }



    
    
}
