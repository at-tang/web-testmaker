package aidantang.testmaker_backend.InternalClasses.Result;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@Entity
@Table(name="question_results")
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResult {

    // Copy-and-pastes of the corresponding Question for efficiency (no need to call for the Question
    // when retrieving results)
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @Column(name="number")
    private int number;

    @Column(name="title")
    private String title;

    @Column(name="description", columnDefinition = "TEXT")
    private String description;

    @Column(name="explanation", columnDefinition = "TEXT")
    private String explanation;

    // Answers are tracked using the Answer's content due to the nature of Short Input questions

    @Column(name="givenAnswers", columnDefinition="varchar(255)[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> givenAnswers;

    @Column(name="correctAnswers", columnDefinition="varchar(255)[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> correctAnswers;

    @Column(name="correct")
    private boolean correct; // Represents if the user got the correct answer

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="quiz_result_id", nullable = false)
    @JsonIgnore
    private QuizResult quizResult;

    public QuestionResult(int number, 

        String description, 
        String explanation, 
        List<String> givenAnswers, 
        List<String> correctAnswers,
        boolean correct,
        QuizResult quizResult) 
        {
            this.number = number;

            this.description = description;
            this.explanation = explanation;
            this.givenAnswers = givenAnswers;
            this.correctAnswers = correctAnswers;
            this.correct = correct;
            this.quizResult = quizResult;

    }
    
    
}
