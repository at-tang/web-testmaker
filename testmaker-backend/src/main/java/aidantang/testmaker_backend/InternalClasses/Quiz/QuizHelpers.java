package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.HashSet;

import org.springframework.stereotype.Component;

import aidantang.testmaker_backend.DTOClasses.Receiving.RequestBody.EditQuiz.UpdatingQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.AnswerDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;


@Component
public class QuizHelpers {
    public String CheckQuizEditInput(UpdatingQuizDTO quiz) {
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
        final int QUIZ_DESC_SIZE = 500;
        final int TAG_SIZE = 10;
        final int QUIZ_TIME_SIZE = 120;

        final int QUESTION_TITLE_SIZE = 100;
        final int QUESTION_DESC_SIZE = 500;
        final int QUESTION_EXPLANATION_SIZE = 500;

        final int ANSWER_CONTENT_SIZE = 100;

        // Restrictions on Quiz Metadata

        if (quiz.getTitle().length() > QUIZ_TITLE_SIZE) return "The quiz's title must be under " + QUIZ_TITLE_SIZE + " characters";
        if (quiz.getDescription().length() > QUIZ_DESC_SIZE) return "The quiz's description must be under " + QUIZ_DESC_SIZE + " characters";
        if (quiz.getTags().size() > TAG_SIZE) return "The quiz cannot have more than " + TAG_SIZE + " tags";
        if (quiz.getTime() > QUIZ_TIME_SIZE) return "The quiz can only have a duration over " + QUIZ_TIME_SIZE + " minutes.";
        

        // Invalid outputs

        if (quiz.getTitle() == "") return "Quiz has no title";
        if (quiz.getTags().size() < 1) return "Quiz requires at least one tag";



        for (QuestionDTO question : quiz.getQuestions()) {

            int displayNumber = question.getNumber() + 1; // Number that is displayed to user

            if (question.getTitle().length() >= QUESTION_TITLE_SIZE) return "Question " + displayNumber + " must have a title under " + QUESTION_TITLE_SIZE + " characters";
            if (question.getDescription().length() >= QUESTION_DESC_SIZE) return "Question " + displayNumber + " has a description over " + QUESTION_DESC_SIZE + " characters.";
            if (question.getExplanation().length() >= QUESTION_EXPLANATION_SIZE) return "Question " + displayNumber + " has an explanation over " + QUESTION_EXPLANATION_SIZE + " characters.";

            HashSet<String> allTitles = new HashSet<String>();


            for (AnswerDTO answer : question.getAnswers()) {

                if (answer.getContent().length() >= ANSWER_CONTENT_SIZE) return "Question " + displayNumber + " contains an answer with over " + ANSWER_CONTENT_SIZE + " characters.";


                if (answer.getContent() == "") {
                    return "Question " + displayNumber + " contains a blank answer.";
                }
                if (allTitles.contains(answer.getContent())) {
                    return "Question " + displayNumber + " contains duplicate answers.";
                }
                else allTitles.add(answer.getContent());
                
            }
        }

        return "";
    }

}



