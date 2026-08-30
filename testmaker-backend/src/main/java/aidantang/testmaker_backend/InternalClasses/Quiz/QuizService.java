package aidantang.testmaker_backend.InternalClasses.Quiz;

import aidantang.testmaker_backend.InternalClasses.Answer.AnswerRepository;
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
import aidantang.testmaker_backend.DTOClasses.Sending.AnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;


@Service
public class QuizService {
    private final AnswerRepository answerRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    public final QuizHelpers quizHelpers;

    public QuizService(QuizRepository quizRepository, UserRepository userRepository, AnswerRepository answerRepository, QuizHelpers quizHelpers) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.answerRepository = answerRepository;
        this.quizHelpers = quizHelpers;
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
    ResponseEntity<QuizDTO> loadQuizPublic(String quizId) {
        /*
        Load a quiz for the user to play. A publix version
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
    ResponseEntity<QuizDTO> loadQuizPrivate(String quizId, Authentication auth) {
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


    @Transactional
    ResponseEntity<UpdatingQuizDTO> editQuiz(Authentication auth, String quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        User user = userRepository.findByEmail(auth.getName());

        if (quiz.isEmpty()) return ResponseEntity.badRequest().build();
        if (quiz.get().getUser().getId() != user.getId()) return ResponseEntity.notFound().header("ErrorType", "Quiz's User ID: " + quiz.get().getUser().getId() + " does not match given id: " + user.getId()).build();

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

        String justification = quizHelpers.CheckQuizEditInput(quizDTO);
        if (justification != "") return ResponseEntity.badRequest().header("Error", justification).build();

        quiz.get().setTitle(quizDTO.getTitle());
        quiz.get().setDescription(quizDTO.getDescription());
        quiz.get().setTags(quizDTO.getTags());
        quiz.get().setVisible(quizDTO.getVisible());
        quiz.get().setTime(quizDTO.getTime());

        ArrayList<String> correctAnswers = new ArrayList<String>();
        int pointsTotal = 0;

        
        quiz.get().getQuestions().clear();
        for (QuestionDTO questionDTO : quizDTO.getQuestions()) {
            pointsTotal += questionDTO.getPoints();

            String currentAnswer = "";
            for (AnswerDTO a : questionDTO.getAnswers()) {
                if (a.getCorrect() == true) currentAnswer = currentAnswer + a.getContent() + "|";
                
            }

            currentAnswer = currentAnswer.substring(0, currentAnswer.length() - 1); // Strip last |
            correctAnswers.add(currentAnswer);

            quiz.get().getQuestions().add(new Question(questionDTO, quiz.get()));
        }

        quiz.get().setTotalPoints(pointsTotal);
        quiz.get().setCorrectAnswers(correctAnswers);
        quiz.get().setTotalQuestions(quiz.get().getQuestions().size());

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
