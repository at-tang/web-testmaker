package aidantang.testmaker_backend.InternalClasses.Like;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/private/like")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PutMapping("/add/{quizId}")
    public ResponseEntity<Void> userLikeQuiz(Authentication auth, @PathVariable("quizId") String quizId) {
        return likeService.userLikeQuiz(auth, quizId);
    }

    @GetMapping("test/{userId}/{quizId}")
    public String test(Authentication auth, @PathVariable("userId") String userId, @PathVariable("quizId") String quizId) {
        return "Test: " + likeService.getUserLikeQuiz(userId, quizId);
    }

    
    
}
