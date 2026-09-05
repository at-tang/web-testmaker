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
import aidantang.testmaker_backend.DTOClasses.Sending.JSON.QuizIdDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizHelpers;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;



@Service
public class QuizService {

    /*
    A Service class that handles business logic regarding quizzes.
    The methods here do not pertain to any of the specific Services.
     */

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
    public ResponseEntity<QuizIdDTO> createBlankQuiz(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        Quiz newQuiz = new Quiz();
        Quiz resultQuiz = quizRepository.save(newQuiz);
        return ResponseEntity.ok(new QuizIdDTO(resultQuiz.getId()));
    }


    @Transactional
    public ResponseEntity<Void> deleteQuiz(Authentication auth, String quizId) {
        User user = userRepository.findByEmail(auth.getName());

        // If no user is found, then it is a bad request
        if (user == null) return ResponseEntity.notFound().build();
        if (quizId.equals("")) return ResponseEntity.badRequest().build();

        // Check that the quiz actually exists
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isEmpty()) return ResponseEntity.notFound().build();

        // Check that the user actually owns the quiz they're trying to delete
        if (quiz.get().getUser() != user) {
            return ResponseEntity.status(401).build();
        } else {
            quizRepository.deleteById(quizId);
            return ResponseEntity.ok().build();
            
        }

        
    }




}
