package aidantang.testmaker_backend.InternalClasses.Quiz;

import aidantang.testmaker_backend.InternalClasses.Answer.AnswerRepository;
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

    /* 

    Methods to be redone

    @Transactional
    ResponseEntity<List<DisplayQuizDTO>> getQuizListBySelf(Authentication auth) {
     

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

    */


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

        // Check if given quiz violates any logical restrictions
        String justification = quizHelpers.CheckQuizEditInput(quizDTO);
        if (justification != "") return ResponseEntity.badRequest().header("Error", justification).build();

        

        ArrayList<String> correctAnswers = new ArrayList<String>();
        int pointsTotal = 0;

        
        quiz.get().getQuestions().clear();
        int i = 0;
        for (QuestionDTO questionDTO : quizDTO.getQuestions()) {

            pointsTotal += questionDTO.getPoints();
            questionDTO.setNumber(i);
            i++;

            // Creating correct answers

            ArrayList<String> currentQuestionCorrectAnswers = new ArrayList<String>();

            for (AnswerDTO a : questionDTO.getAnswers()) {
                if (a.getCorrect() == true) {
                    String currentAnswer = a.getContent();

                    // If question is NOT marked as "Case-Sensitive and is a "Short Input" Question
                    // then place the answer all into lowercase
                    if (!questionDTO.isCaseSensitive() && questionDTO.getType() == "SI") currentAnswer = currentAnswer.toLowerCase();

                    currentQuestionCorrectAnswers.add(a.getContent());
                };
            }

            Collections.sort(currentQuestionCorrectAnswers);
            questionDTO.setCorrectAnswers(currentQuestionCorrectAnswers);


            quiz.get().getQuestions().add(new Question(questionDTO, quiz.get()));
        }

        quiz.get().setTitle(quizDTO.getTitle());
        quiz.get().setDescription(quizDTO.getDescription());
        quiz.get().setTags(quizDTO.getTags());
        quiz.get().setVisible(quizDTO.getVisible());
        quiz.get().setTime(quizDTO.getTime());
        quiz.get().setTotalPoints(pointsTotal);
        quiz.get().setCorrectAnswers(correctAnswers);
        quiz.get().setTotalQuestions(quiz.get().getQuestions().size());
        quiz.get().setDateUpdated((int) Instant.now().getEpochSecond());

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

        if (result.getBody().getVisible() == false) {
            return ResponseEntity.status(401).build();
        }

        return result;
    }

    @Transactional
    ResponseEntity<DisplayQuizDTO> getQuizPrivate(Authentication auth, String quizId) {
        User user = userRepository.findByEmail(auth.getName());
        ResponseEntity<DisplayQuizDTO> result = getQuiz(quizId);

        if (result.getBody().getVisible() == false && result.getBody().getUserId() != user.getId()) {
            return ResponseEntity.status(401).build();
        }
        DisplayQuizDTO quiz = result.getBody();
        quiz.setUserLiked(likeRepository.existsByUserIdAndQuizId(user.getId(), quizId));
        if (quiz.getId() == user.getId()) quiz.setOwnQuiz(true);

        return ResponseEntity.ok(quiz);
    }


}
