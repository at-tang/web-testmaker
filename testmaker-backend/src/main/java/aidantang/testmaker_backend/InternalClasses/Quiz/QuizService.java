package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Receiving.NewQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Receiving.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;


@Service
public class QuizService {
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    ResponseEntity<List<DisplayQuizDTO>> getQuizListBySelf(Authentication auth) {
        /*
        Gets all the user's quizzes in list format
         */

        User user = userRepository.findByEmail(auth.getName());
        List<Quiz> quizzes = user.getQuizzes();
        List<DisplayQuizDTO> result = new ArrayList<DisplayQuizDTO>();
        for (Quiz quiz : quizzes) {
            DisplayQuizDTO current = new DisplayQuizDTO(quiz);
            result.add(current);

        }
        return ResponseEntity.ok().body(result);
    }

    @Transactional
    ResponseEntity<List<DisplayQuizDTO>> getQuizListByOtherUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) return ResponseEntity.notFound().build();

        List<Quiz> quizzes = user.get().getQuizzes();
        List<DisplayQuizDTO> result = new ArrayList<DisplayQuizDTO>();

        for (Quiz quiz : quizzes) {
            if (quiz.getVisible()) {
                result.add(new DisplayQuizDTO(quiz));
            }
        }
        return ResponseEntity.ok(result);
    }


    @Transactional
    ResponseEntity<QuizDTO> loadQuiz(String quizId) {
        /*
        Load a quiz for the user to play
         */

        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isEmpty()) return ResponseEntity.badRequest().build();

        QuizDTO result = new QuizDTO(quiz.get());
        return ResponseEntity.ok(result);

    }


    @Transactional
    ResponseEntity<UpdatingQuizDTO> editQuiz(Authentication auth, String quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        User user = userRepository.findByEmail(auth.getName());

        if (quiz.isEmpty()) return ResponseEntity.badRequest().build();
        if (quiz.get().getUser().getId() != user.getId()) return ResponseEntity.notFound().header("Error Type", "Quiz's User ID: " + quiz.get().getUser().getId() + " does not match given id: " + user.getId()).build();

        UpdatingQuizDTO result = new UpdatingQuizDTO(quiz.get());
        return ResponseEntity.ok(result);
    }


    @Transactional
    ResponseEntity<QuizDTO> createQuiz(Authentication auth, NewQuizDTO newQuizDTO) {
        User user = userRepository.findByEmail(auth.getName());


        Quiz quiz = new Quiz(newQuizDTO, user);

        user.getQuizzes().add(quiz);

        User newUser = userRepository.save(user);

        QuizDTO result = new QuizDTO(newUser.getQuizzes().getLast());

        return ResponseEntity.status(201).body(result);

    }

    @Transactional
    ResponseEntity<QuizDTO> updateQuiz(Authentication auth, UpdatingQuizDTO quizDTO) {
        User user = userRepository.findByEmail(auth.getName());

        Optional<Quiz> quiz = quizRepository.findById(quizDTO.getId());
        if (quiz.isEmpty()) return ResponseEntity.notFound().build();

        // Compare IDs by value and verify the quiz belongs to the authenticated user.
        if (!Objects.equals(user.getId(), quizDTO.getUserId())
            || !Objects.equals(user.getId(), quiz.get().getUser().getId())) {
            return ResponseEntity.badRequest().build();
        }

        quiz.get().setTitle(quizDTO.getTitle());
        quiz.get().setDescription(quizDTO.getDescription());
        quiz.get().setTags(quizDTO.getTags());
        quiz.get().setVisible(quizDTO.getVisible());
        
        quiz.get().getQuestions().clear();
        for (QuestionDTO questionDTO : quizDTO.getQuestions()) {
            quiz.get().getQuestions().add(new Question(questionDTO, quiz.get()));
        }
        quizRepository.save(quiz.get());
        

        
        return ResponseEntity.status(200).body(new QuizDTO(quiz.get()));   
    }

    @Transactional
    ResponseEntity<Void> deleteQuiz(Authentication auth, String quizId) {
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


}
