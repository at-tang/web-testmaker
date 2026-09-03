package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.InternalClasses.Like.LikeRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;

@Service
public class QuizListService {
    /*
    This particular service focuses on loading lists of quizzes at the time,
    most often for searching for quizzes or a user looking at their own quizzes
     */

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public QuizListService(QuizRepository quizRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;

    }

    public ResponseEntity<List<DisplayQuizDTO>> getUserOwnQuizListByLastUpdated(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        List<Quiz> quizzes = quizRepository.getUserOwnQuizListByLastUpdated(user.getId());
        List<DisplayQuizDTO> result = new ArrayList<>();
        for (Quiz quiz : quizzes) {

            boolean liked = likeRepository.existsByUserIdAndQuizId(user.getId(), quiz.getId());
            result.add(new DisplayQuizDTO(quiz, liked, user.getId()));
        }

        return ResponseEntity.ok(result);
        
    }
}
