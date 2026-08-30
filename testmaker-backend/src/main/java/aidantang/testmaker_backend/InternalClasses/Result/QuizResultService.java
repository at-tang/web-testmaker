package aidantang.testmaker_backend.InternalClasses.Result;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Receiving.EvaluateQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizResultDTO;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    public QuizResultService(QuizResultRepository quizResultRepository, UserRepository userRepository) {
        this.quizResultRepository = quizResultRepository;
        this.userRepository = userRepository;
    }


    @Transactional
    public ResponseEntity<String> evaluateQuizPrivate(Authentication auth, EvaluateQuizDTO dto) {
        /*
        This function returns the id of the new QuizResult, which is intended to be used
        to redirect the user from the play page to the results page
         */

        User user = userRepository.findByEmail(auth.getName());

        QuizDTO quiz = dto.getQuiz();
        List<String> correctAnswers = quiz.getCorrectAnswers();
        List<QuestionDTO> questions = quiz.getQuestions();
        
        List<String> givenAnswers = dto.getAnswers();

        ArrayList<QuestionResult> questionResults = new ArrayList<QuestionResult>();

        int pointsEarned = 0;
        boolean currentCorrect = false;

        // Evaluate each answerSet
        for (int i = 0; i < givenAnswers.size(); i++) {
            QuestionDTO cq = questions.get(i); // cq = "Current Question"
            currentCorrect = false;

            if (givenAnswers.get(i) == correctAnswers.get(i)) { // If answer is correct
                pointsEarned += cq.getPoints();
                currentCorrect = true;

            }


            QuestionResult currentQuestionResult = new QuestionResult(
                cq.getNumber(), cq.getTitle(), cq.getDescription(),
                cq.getExplanation(), givenAnswers.get(i), correctAnswers.get(i), currentCorrect);

            questionResults.add(currentQuestionResult);
        }

        QuizResult quizResult = new QuizResult(quiz.getTitle(), pointsEarned, quiz.getTotalPoints(), user, questionResults);
        QuizResult result = quizResultRepository.save(quizResult);

        return ResponseEntity.ok(result.getId());
        
    }
    
}
