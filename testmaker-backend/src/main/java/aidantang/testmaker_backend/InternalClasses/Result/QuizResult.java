package aidantang.testmaker_backend.InternalClasses.Result;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @Column(name="quizTitle")
    private String quizTitle;

    @Column(name="pointsObtained")
    private int pointsObtained; // Number of points the user obtained

    @Column(name="pointsTotal")
    private int pointsTotal; // Total points availible

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId", nullable = false)
    private User user;

    @OneToMany(mappedBy="quizResult", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionResult> questionResults = new ArrayList<QuestionResult>();

    public QuizResult(String quizTitle, int pointsObtained, int pointsTotal, User user, List<QuestionResult> questionResults) {
        this.quizTitle = quizTitle;
        this.pointsObtained = pointsObtained;
        this.pointsTotal = pointsTotal;
        this.user = user;
        this.questionResults = questionResults;
    }

    
}
