package aidantang.testmaker_backend.InternalClasses.Like;

import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class LikeService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository, UserRepository userRepository, QuizRepository quizRepository){

        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
    }


    @Transactional
    public ResponseEntity<Void> userLikeQuiz(Authentication auth, String quizId) {
        /*
        The following function occurs when the user presses the "Like Button"
        on a quiz, either creating a new like or deleting their like
         */
        User user = userRepository.findByEmail(auth.getName());
        Optional<Quiz> quiz = quizRepository.findById(quizId);


        if (user == null || quiz.isEmpty()) return ResponseEntity.notFound().build();
    

        boolean alreadyLiked = likeRepository.existsByUserIdAndQuizId(user.getId(), quizId);

        if (alreadyLiked) { // If the user has already liked this quiz, undo the like
            likeRepository.deleteByUserIdAndQuizId(user.getId(), quizId);
            quiz.get().setLikes(quiz.get().getLikes() - 1);
            quizRepository.save(quiz.get());

        } else {
            Like like = new Like(new LikeId(user.getId(), quizId));
            quiz.get().setLikes(quiz.get().getLikes() + 1);
            quizRepository.save(quiz.get());
            likeRepository.save(like);
        }
        return ResponseEntity.ok().build();
    }
    
}
