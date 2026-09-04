package aidantang.testmaker_backend.InternalClasses.Quiz.Services;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;

import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizHelpers;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizPlayService {
    /*
    A Service class pertaining to all methods involving
    a user playing a quiz, whether they be the author or not
     */


    private final QuizRepository quizRepository;
    private final UserRepository userRepository;


    public QuizPlayService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;

    }

    @Transactional
    public ResponseEntity<QuizDTO> loadQuizPublic(String quizId) {
        /*
        Load a quiz for the user to play. A public version
        that allows users not signed in to play.

        As such, only public quizzes can be retrieved
         */

        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isEmpty()) return ResponseEntity.badRequest().build();

        // A non-signed in user cannot access a private quiz
        if (quiz.get().getVisible() == false) {
            return ResponseEntity.notFound().build();
        }

        QuizDTO result = new QuizDTO(quiz.get());
        return ResponseEntity.ok(result);

    }


    @Transactional
    public ResponseEntity<QuizDTO> loadQuizPrivate(String quizId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        Optional<Quiz> quiz = quizRepository.findById(quizId);

        if (quiz.isEmpty()) return ResponseEntity.notFound().build();

        // If the quiz is public
        if (quiz.get().getVisible() == true) {
            QuizDTO result = new QuizDTO(quiz.get());
            return ResponseEntity.ok(result);
        }

        for (Quiz q : user.getQuizzes()) {
            if (q.getId() == quizId) {
                QuizDTO result = new QuizDTO(quiz.get());
                return ResponseEntity.ok(result);
            }

        }

        return ResponseEntity.notFound().build();

    }
}
