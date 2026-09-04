package aidantang.testmaker_backend.InternalClasses.Result;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz.EvaluateQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EvaluateQuiz.GivenAnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    public QuizResultService(QuizResultRepository quizResultRepository, UserRepository userRepository, QuizRepository quizRepository) {
        this.quizResultRepository = quizResultRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
    }

    @Transactional
    public ResponseEntity<QuizResultDTO> evaluateQuiz(Authentication auth, EvaluateQuizDTO dto) {
        User user = userRepository.findByEmail(auth.getName());

        List<QuestionDTO> questions = dto.getAllQuestions();
        List<GivenAnswerDTO> givenAnswers = dto.getAllGivenAnswers();
        QuizDTO quiz = dto.getQuiz();

        // Constructing the QuizResult
        String quizId = quiz.getId();
        String quizTitle = quiz.getTitle();
        int pointsObtained = 0;
        int pointsTotal = quiz.getTotalPoints();
        ArrayList<QuestionResult> questionResults = new ArrayList<QuestionResult>();

        QuizResult quizResult = new QuizResult(quizId, quizTitle, pointsObtained, pointsTotal, user, questionResults);



        if (questions.size() != givenAnswers.size()) return ResponseEntity.badRequest().build();

        for (int i = 0; i < questions.size(); i++) {
            QuestionDTO question = questions.get(i);
            GivenAnswerDTO answer = givenAnswers.get(i);

            

            String description = question.getDescription();
            String explanation = question.getExplanation();
            List<String> given = answer.getGivenAnswers();
            List<String> correctAnswers = question.getCorrectAnswers();
            boolean correct = false;


            // Evaluate Question :======================================

            // Scenario in which the user does not place any answer
            // As every question MUST have at least one answer, this case
            // is here for expediency. Multiple Choice questions
            // can simply use "None of the Above" to simulate a question
            // where none of the choices are correct.
            if (answer.getGivenAnswers().size() == 0) {
                
            }

            else if (question.getType().equals("SI")) {
                String textAnswer = answer.getGivenAnswers().getFirst();

                // Just in case, Questions are all converted to lowercase if case-sensitivity is off
                // Should be handled with Editing questions
                if (!(question.isCaseSensitive())) {
                    textAnswer = textAnswer.toLowerCase();
                    for (int a = 0; a < correctAnswers.size(); a++) {
                        correctAnswers.set(a, correctAnswers.get(a).toLowerCase());

                    }
                }

                if (question.getCorrectAnswers().contains(textAnswer)) {
                    System.out.println("Evaluating, Given: " + textAnswer + ", Correct: " + question.getCorrectAnswers());
                    pointsObtained += question.getPoints();
                    correct = true;
                }
            }


            else if (question.getType().equals("MC") || question.getType().equals("TF")) {
                if (question.getCorrectAnswers().equals(answer.getGivenAnswers())) {
                    pointsObtained += question.getPoints();
                    correct = true;
                }
            }


            else { // Test Case. Should NEVER be activated unless the quiz is malformed by
                   // third-party altercations
                pointsObtained -= 10;
            }

            QuestionResult newQuestionResult = new QuestionResult(i, description, explanation, given, correctAnswers, correct, quizResult);
            questionResults.add(newQuestionResult);

        }

        quizResult.setPointsObtained(pointsObtained);
        quizResult.setQuestionResults(questionResults);  
        QuizResult result = quizResultRepository.save(quizResult);

        // Increment the number of plays this quiz has
        Optional<Quiz> quizData = quizRepository.findById(quizId);
        if (!quizData.isEmpty()) {
            // No error is requested as the quiz might be deleted WHILE a user is playing it
            quizData.get().setPlays(quizData.get().getPlays() + 1);
            quizRepository.save(quizData.get());
        }
        return ResponseEntity.ok(new QuizResultDTO(result));
        
    }


    @Transactional
    public ResponseEntity<QuizResultDTO> getQuizResult(Authentication auth, String resultId) {
        System.out.println("=== getQuizResult called ===");
        System.out.println("Auth: " + auth);
        System.out.println("Auth Name: " + (auth != null ? auth.getName() : "null"));
        System.out.println("ResultId: " + resultId);
        
        User user = userRepository.findByEmail(auth.getName());
        System.out.println("User found: " + (user != null ? user.getEmail() : "null"));
        
        if (user == null) {
            System.out.println("User not found, returning 404");
            return ResponseEntity.notFound().build();
        }
        
        Optional<QuizResult> quizResult = quizResultRepository.findById(resultId);
        System.out.println("Quiz result found: " + quizResult.isPresent());
        
        if (quizResult.isEmpty()) {
            System.out.println("Quiz result not found, returning 404");
            return ResponseEntity.notFound().build();
        }
        
        // Verify that the result belongs to the authenticated user
        String resultUserId = quizResult.get().getUser().getId();
        String authUserId = user.getId();
        System.out.println("Result user ID: " + resultUserId);
        System.out.println("Auth user ID: " + authUserId);
        
        if (!resultUserId.equals(authUserId)) {
            System.out.println("User ID mismatch, returning 403");
            return ResponseEntity.status(403).build();
        }

        QuizResultDTO result = new QuizResultDTO(quizResult.get());
        return ResponseEntity.ok().body(result);
    }


    
}