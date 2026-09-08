package aidantang.testmaker_backend.InternalClasses.Question;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import aidantang.testmaker_backend.DTOClasses.Sending.QuestionDTO;
import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Entity(name="questions")
@Data
@NoArgsConstructor
public class Question {
    

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // number: int
    // number represents the index of the particular question in the Quiz it corrsponds to
    // The question's number indicates when in the quiz it will appear
    @Column(name="number")
    private int number;

    // description: String
    // description represents the actual question itself
    @Column(name="description")
    private String description = "";


    // type: String
    // type indicates what type of question this particular instance is
    // type can only be "SI" (Short Input), "MC" (Multiple Choice), or "TF" (True/False)
    @Column(name="type")
    private String type = "MC";

    // hint: String
    // Currently a potential feature. Hint would be an optional parameter
    // that would give the quiz taker a hint on what the right answer might be
    @Column(name="hint")
    private String hint = "";

    // explanation: String
    // Optional parameter. explanation represents an eponymous explanation of why an answer is correct
    // Shown to all quiz takers after submitting their quiz and evaluating the result
    @Column(name="explanation")
    private String explanation = "";

    // points: int
    // How many points does this particular question reward when done correctly?
    // Also used to calculate how many points are available.
    @Column(name="points")
    private int points = 1;

    // caseSensitive: Boolean
    // Indicates whether or not the user must be case-sensitive with their given answer
    // If true, then "Green" != "green". If false, "green" == "Green"
    @Column(name = "caseSensitive")
    private boolean caseSensitive = false;

    @OneToMany(mappedBy="question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<Answer>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="quizId")
    @JsonIgnore
    private Quiz quiz;
    
    // correctAnswers: List<String>
    // A List of Strings containing all the correct answers
    // Stored here to expediate the process of evaluating the quiz by reducing it
    // to simply checking that the array of correctAnswers and givenAnswers are the same
    @Column(name="correctAnswers", columnDefinition="varchar(255)[]")
    @JdbcTypeCode(SqlTypes.ARRAY)
    private List<String> correctAnswers;

    public Question(QuestionDTO questionDTO, Quiz quiz) {
        this.number = questionDTO.getNumber();
        this.description = questionDTO.getDescription();
        this.type = questionDTO.getType();
        this.hint = questionDTO.getHint();
        this.explanation = questionDTO.getExplanation();
        this.quiz = quiz;
        this.correctAnswers = questionDTO.getCorrectAnswers();
        this.caseSensitive = questionDTO.isCaseSensitive();

        this.answers = new ArrayList<Answer>();

        for (int i = 0; i < questionDTO.getAnswers().size(); i++) {
            Answer current = new Answer(questionDTO.getAnswers().get(i), this);
            if (!this.caseSensitive && this.type == "SI") {
                current.setContent(current.getContent().toLowerCase());
            }
            this.answers.add(current);

        }
    }


}
