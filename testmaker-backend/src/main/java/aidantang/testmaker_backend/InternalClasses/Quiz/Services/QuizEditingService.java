package aidantang.testmaker_backend.InternalClasses.Quiz.Services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.AnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizHelpers;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizEditingService {
    /*
    A Service class containing all the business logic
    surrounding a user editing their quizzes.

    As a user must be signed in to edit quizzes, all methods
    require authentication


     */

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    public final QuizHelpers quizHelpers;


    public QuizEditingService(QuizRepository quizRepository, UserRepository userRepository, QuizHelpers quizHelpers) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.quizHelpers = quizHelpers;
    }


    @Transactional
    public ResponseEntity<UpdatingQuizDTO> retrieveQuizToEdit(Authentication auth, String quizId) {
        /*
        A method that retrieves the quiz the user wishes to edit
         */

        Optional<Quiz> quiz = quizRepository.findById(quizId);
        User user = userRepository.findByEmail(auth.getName());

        if (quiz.isEmpty()) return ResponseEntity.badRequest().build();
        if (quiz.get().getUser().getId() != user.getId()) return ResponseEntity.notFound().header("ErrorType", "Quiz's User ID: " + quiz.get().getUser().getId() + " does not match given id: " + user.getId()).build();

        UpdatingQuizDTO result = new UpdatingQuizDTO(quiz.get());
        return ResponseEntity.ok(result);
    }



    @Transactional
    public ResponseEntity<QuizDTO> updateQuiz(Authentication auth, UpdatingQuizDTO quizDTO) {
        /*
        Given a Data Transfer Object representing the new data of a quiz,
        the following function verifies that the quiz is properly formatted 
        (e.g. Normal title length, all answers have at least one correct answer, etc.),
        checks that the user submitting the edit also owns the quiz, before saving
        the new quiz to the database.

        The method returns a negative status code if:
            - The Quiz that is to be updated cannot be found (invalid ID) (404)
            - The user does not own the quiz they're trying to edit (401)
            - The quiz is not properly formatted (see the helper function) (400)

        The method returns a positive status code (200) if:
            - The quiz is properly formatted and is saved to the database. The quiz
            is then given within the body of the response.
         */


        // Find corresponding user
        User user = userRepository.findByEmail(auth.getName());

        // Check that the quiz in question exists
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
    
}
