package aidantang.testmaker_backend.InternalClasses.Result;

import aidantang.testmaker_backend.InternalClasses.Answer.AnswerRepository;
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
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList.QuizResultList;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList.QuizResultListEntryDTO;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizResultService {
    /*
    A service class containing the business logic surrounding QuizResults.

    A QuizResult essentially contains how well the user did on a specific quiz.
    Parameters like pointsObtained track their score, while a QuizResult holds
    a List of QuestionResults that store the answers a user gave on a question vs. the actual answers.

    As QuizResults are records, there are no methods pertaining to updating them.
    Though a Quiz might be altered, a QuizResult will always contain the questions of a quiz
    at that specific time.
     */

    private final AnswerRepository answerRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    public QuizResultService(QuizResultRepository quizResultRepository, UserRepository userRepository, QuizRepository quizRepository, AnswerRepository answerRepository) {
        this.quizResultRepository = quizResultRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.answerRepository = answerRepository;
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


            else if (question.getType().equals("MC")) {
                if (question.getCorrectAnswers().equals(answer.getGivenAnswers())) {
                    pointsObtained += question.getPoints();
                    correct = true;
                }
            }

            else if (question.getType().equals("TF")) {
                if (question.getCorrectAnswers().get(0).toLowerCase().equals(answer.getGivenAnswers().get(0).toLowerCase())) {
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
        /*
        Retrieves a singular Quiz Result for a detailed view. 
         */
   
        User user = userRepository.findByEmail(auth.getName());
 
        if (user == null) {
            System.out.println("User not found, returning 404");
            return ResponseEntity.notFound().build();
        }
        
        Optional<QuizResult> quizResult = quizResultRepository.findById(resultId);
        
        if (quizResult.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Verify that the result belongs to the authenticated user
        String resultUserId = quizResult.get().getUser().getId();
        String authUserId = user.getId();

        
        if (!resultUserId.equals(authUserId)) {
            return ResponseEntity.status(403).build();
        }

        QuizResultDTO result = new QuizResultDTO(quizResult.get());
        return ResponseEntity.ok().body(result);
    }


    public ResponseEntity<QuizResultList> getUserQuizResultHistoryByPageFilterByQuizTitle(
        Authentication auth, // User's authentication details
        int pageRequested, // The page that is being requested. 
        int entriesPerPage, // How many entries are in one page
        String searchParam // The given search parameters. 
        ) {
            /*
            Retrieves a list containing multiple QuizResults, intended for a compact view.
            Only contains brief amounts of information. For a detailed view, the method above
            is designed for such a task.
             */

                // Check if a searchParam is given. If not, searches for "", or retrieves all entries
                String param = (searchParam == null || searchParam.isBlank() || "all".equalsIgnoreCase(searchParam)) ? "" : searchParam;

                // Finds the user associated with Authentication auth. If not found, return an error
                User user = userRepository.findByEmail(auth.getName());
                if (user == null) return ResponseEntity.notFound().build();

                List<QuizResult> entries = quizResultRepository.getUserQuizResultHistoryByPageFilterByQuizTitle(
                        user.getId(),
                        entriesPerPage,
                        entriesPerPage * Math.max(0, pageRequested - 1),
                        param);


                // Convert the valid entries into DTOs 
                List<QuizResultListEntryDTO> result = new ArrayList<>();
                for (QuizResult q : entries) {
                    result.add(new QuizResultListEntryDTO(q));
                }

                // Retrieve the total number of results that fit the criteria. This is mainly for the frontend
                // to determine how many pages there are, and stop the user from going a page over.
                int howManyFit = quizResultRepository.countAllResultsByUserId(user.getId(), param);

                return ResponseEntity.ok(new QuizResultList(howManyFit, result));
    }




    
}