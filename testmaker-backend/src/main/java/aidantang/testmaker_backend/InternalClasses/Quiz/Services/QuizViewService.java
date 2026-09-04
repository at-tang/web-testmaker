package aidantang.testmaker_backend.InternalClasses.Quiz.Services;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.InternalClasses.Like.LikeRepository;
import aidantang.testmaker_backend.InternalClasses.Like.LikeService;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizHelpers;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizViewService {

    /*
    A service class for viewing a quiz in depth, namely from the quiz/view/{quizId} page.
     */

    private final LikeRepository likeRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    public final QuizHelpers quizHelpers;
    private final LikeService likeService;

    public QuizViewService(QuizRepository quizRepository, UserRepository userRepository, QuizHelpers quizHelpers, LikeRepository likeRepository, LikeService likeService) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.quizHelpers = quizHelpers;
        this.likeRepository = likeRepository;
        this.likeService = likeService;

    }

    @Transactional
    ResponseEntity<DisplayQuizDTO> getQuizMetadata(String quizId) {
        /*
        A method that retrieves a quiz for the user to view

         */

        Optional<Quiz> quiz = quizRepository.findById(quizId);

        if (quiz.isEmpty()) return ResponseEntity.notFound().build();

        // False is a temporary value. getQuizPrivate will assign true if valid.
        DisplayQuizDTO result = new DisplayQuizDTO(quiz.get(), false, "");
        return ResponseEntity.ok(result);

    }


    @Transactional
    public ResponseEntity<DisplayQuizDTO> getQuizMetadataPublic(String quizId) {
        ResponseEntity<DisplayQuizDTO> result = getQuizMetadata(quizId);

        if (result.getStatusCode().value() != 200) return result;

        if (result.getBody().getVisible() == false) {
            return ResponseEntity.status(401).build();
        }

        return result;
    }


    @Transactional
    public ResponseEntity<DisplayQuizDTO> getQuizMetadataPrivate(Authentication auth, String quizId) {
        User user = userRepository.findByEmail(auth.getName());
        ResponseEntity<DisplayQuizDTO> result = getQuizMetadata(quizId);

        if (result.getStatusCode().value() != 200) return result;

        if (result.getBody().getVisible() == false && result.getBody().getUserId() != user.getId()) {
            return ResponseEntity.status(401).build();
        }
        DisplayQuizDTO quiz = result.getBody();
        quiz.setUserLiked(likeRepository.existsByUserIdAndQuizId(user.getId(), quizId));
        if (quiz.getId() == user.getId()) quiz.setOwnQuiz(true);

        return ResponseEntity.ok(quiz);
    }
    
}
