package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.User.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DisplayQuizDTO {
    /*
    ViewQuizDTO is a class that is generally sent by the backend.
    The class displays the general metadata of a Quiz, with the
    purpose of merely acting as display. 
     */

    private String id;
    private Boolean visible;
    private String ownerName;
    private String userId;
    private String title;
    private String description;
    private List<String> tags;
    
    private int totalRating;
    private int totalUsersRated;
    private int time;
    private int questionCount;
    private int plays;
    private int likes;

    private int totalPoints;
    private int totalQuestions;

    private Boolean randomQuestionOrder;

    private boolean userLiked;
    private boolean ownQuiz; // Does the user own this quiz?

    private int dateCreated;
    private int dateUpdated;

    public DisplayQuizDTO(Quiz quiz, boolean userLiked, String userId) {
        this.id = quiz.getId();
        this.visible = quiz.getVisible();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.tags = quiz.getTags();

        this.totalRating = quiz.getTotalRating();
        this.totalUsersRated = quiz.getTotalUsersRated();
        this.ownerName = quiz.getUser().getDisplayName();
        this.userId = quiz.getUser().getId();
        this.time = quiz.getTime();
        this.questionCount = quiz.getQuestions().size();
        this.plays = quiz.getPlays();
        this.totalPoints = quiz.getTotalPoints();
        this.totalQuestions = quiz.getTotalQuestions();
        this.randomQuestionOrder = quiz.isRandomQuestionOrder();
        this.userLiked = userLiked;
        this.likes = quiz.getLikes();

        this.dateCreated = quiz.getDateCreated();
        this.dateUpdated = quiz.getDateUpdated();

        if (userId == quiz.getUser().getId()) this.ownQuiz = true;
        else this.ownQuiz = false;


    }


    
}
