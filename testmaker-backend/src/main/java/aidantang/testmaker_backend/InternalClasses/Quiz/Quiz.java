package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.DTOClasses.Receiving.NewQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizDTO;
import aidantang.testmaker_backend.InternalClasses.Question.Question;
import aidantang.testmaker_backend.InternalClasses.User.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="quizzes")
@Data
@NoArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="visible")
    private Boolean visible = false;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="tags")
    private List<String> tags = new ArrayList<String>();

    @Column(name="totalRating")
    private int totalRating = 0;

    @Column(name="totalUsersRated")
    private int totalUsersRated = 0;

    @OneToMany(mappedBy="quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<Question>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private User user;

    @Column(name="time")
    private int time = 300;

    /*
    Other properties to be added:
    Comments: Set<Comment>
     */

    public Quiz(NewQuizDTO newQuiz, User user) {
        this.title = newQuiz.getTitle();
        this.description = newQuiz.getDescription();
        this.user = user;
        
    }


}
