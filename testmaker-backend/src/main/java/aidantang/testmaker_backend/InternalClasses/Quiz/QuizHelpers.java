package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Component;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.AnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;


@Component
public class QuizHelpers {
    public boolean CheckQuizEditInput(UpdatingQuizDTO quiz) {
    /*
    A helper function that checks the given Quiz input given by the Edit function,
    and sees that all the restrictions are being upheld. 

    Returns a string justification, which states the possible error within the quiz.
    If there is no violation, then it returns a blank String ""

    Error Types:
        1. Quiz has no title
        2. Quiz has < 1 tag
        3. Quiz contains questions with a blank answer
        4. Quiz contains > 1 answer with duplicate text
        5. There exist questions without a correct answer <- currently here
        6. The Quiz has no questions
        7. A question has no answers

        A. Title has character count > 60
        B. Description has character count > 500
        C. There are > 10 tags 
        D. Time alloted is over 2 hours

        E. A question has a character count of over 100
        F. A question has a description count over 300
        G. An answer has a character count of over 100

     */

        final int QUIZ_TITLE_SIZE = 100;
        final int QUIZ_DESC_SIZE = 1000;
        final int TAG_SIZE = 10;
        final int QUIZ_TIME_SIZE = 120;

        // Restrictions on Quiz Metadata

        if (quiz.getTitle().length() > QUIZ_TITLE_SIZE) return false;
        if (quiz.getDescription().length() > QUIZ_DESC_SIZE) return false;
        if (quiz.getTags().size() > TAG_SIZE) return false;
        if (quiz.getTime() > QUIZ_TIME_SIZE) return false;
        

        // Invalid outputs

        if (quiz.getTitle().length() < 8) return false; // Titles must have at least 8 characters
        if (quiz.getQuestions().size() < 1) return false;

        for (QuestionDTO question : quiz.getQuestions()) {

            boolean isProper = checkQuestion(question);
            if (!isProper) return false;
        }

        return true;


    }


    public boolean checkQuestion(QuestionDTO question) {

        final int QUESTION_DESC_SIZE = 1000;
        final int QUESTION_EXPLANATION_SIZE = 1000;
        

        if (question.getDescription().length() > QUESTION_DESC_SIZE) return false;

        // A description cannot be blank
        if (question.getDescription().length() == 0) return false;


        if (question.getExplanation().length() > QUESTION_EXPLANATION_SIZE) return false;

        // A question cannot have a point value under 1
        if (question.getPoints() < 1) return false;

        // A question cannot have a number below 0
        if (question.getNumber() < 0) return false;

        // Question must have one of the following types: MC, SI, TF
        if (!(question.getType().equals("MC")) && !(question.getType().equals("SI")) && !(question.getType().equals("TF"))) return false;

        // Questions must have at least one answer
        if (question.getAnswers().size() == 0) return false;

        int numOfCorrect = 0;


        // Check all answers wirthin the quiz
        for (AnswerDTO answer : question.getAnswers()) {
            if (answer.getCorrect()) numOfCorrect++;

            boolean isProper = checkAnswer(answer);
            if (!isProper) return false;
        }

        // A question must have at least one correct answer
        if (numOfCorrect < 1) return false;

        return true;
    }

    public boolean checkAnswer(AnswerDTO answer) {
        final int ANSWER_CONTENT_SIZE = 200;

        // All answers must have text and be 1-100 characters
        if (answer.getContent().length() < 1) return false;
        if (answer.getContent().length() > ANSWER_CONTENT_SIZE) return false;


        return true;

    }

}



