package aidantang.testmaker_backend.InternalClasses.Quiz.Services;

import aidantang.testmaker_backend.InternalClasses.Like.LikeRepository;
import aidantang.testmaker_backend.InternalClasses.Like.LikeService;

import java.util.Optional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;

import java.util.Objects;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.CreateQuiz.NewQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.AnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizHelpers;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;



@Service
public class QuizService {

    private final LikeRepository likeRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    public final QuizHelpers quizHelpers;
    private final LikeService likeService;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository, QuizHelpers quizHelpers, LikeRepository likeRepository, LikeService likeService) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.quizHelpers = quizHelpers;
        this.likeRepository = likeRepository;
        this.likeService = likeService;

    }

    
    @Transactional
    public ResponseEntity<QuizDTO> createQuiz(Authentication auth, NewQuizDTO newQuizDTO) {
        User user = userRepository.findByEmail(auth.getName());


        Quiz quiz = new Quiz(newQuizDTO, user);

        user.getQuizzes().add(quiz);

        User newUser = userRepository.save(user);

        QuizDTO result = new QuizDTO(newUser.getQuizzes().getLast());

        return ResponseEntity.status(201).body(result);

    }


    @Transactional
    public ResponseEntity<Void> deleteQuiz(Authentication auth, String quizId) {
        User user = userRepository.findByEmail(auth.getName());

        // If no user is found, then it is a bad request
        if (user == null) return ResponseEntity.badRequest().build();

        for (int i = 0; i < user.getQuizzes().size(); i++) {
            if (user.getQuizzes().get(i).getId() == quizId) {
                user.getQuizzes().remove(i);
                userRepository.save(user);
                return ResponseEntity.status(200).build();
            }
        }


        // If the quiz is not in the user's list of quizzes, return
        // a not found error
        return ResponseEntity.notFound().build();
    }

    @Transactional
    ResponseEntity<DisplayQuizDTO> getQuiz(String quizId) {
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
    ResponseEntity<DisplayQuizDTO> getQuizPublic(String quizId) {
        ResponseEntity<DisplayQuizDTO> result = getQuiz(quizId);

        if (result.getStatusCode().value() != 200) return result;

        if (result.getBody().getVisible() == false) {
            return ResponseEntity.status(401).build();
        }

        return result;
    }

    @Transactional
    ResponseEntity<DisplayQuizDTO> getQuizPrivate(Authentication auth, String quizId) {
        User user = userRepository.findByEmail(auth.getName());
        ResponseEntity<DisplayQuizDTO> result = getQuiz(quizId);

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
