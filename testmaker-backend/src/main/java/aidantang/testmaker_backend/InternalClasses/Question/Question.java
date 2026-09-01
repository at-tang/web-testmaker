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


    @Column(name="title")
    private String title = "";


    @Column(name="description")
    private String description = "";


    // type: String
    // type indicates what type of question this particular instance is
    // type can only be "SI" (Short Input), "MC" (Multiple Choice), or "TF" (True/False)
    @Column(name="type")
    private String type = "MC";


    @Column(name="hint")
    private String hint = "";

    @Column(name="explanation")
    private String explanation = "";

    @Column(name="points")
    private int points = 1;

    @Column(name = "caseSensitive")
    private boolean caseSensitive = false;


    @OneToMany(mappedBy="question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<Answer>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="quizId")
    @JsonIgnore
    private Quiz quiz;

    @Column(name="correctAnswers")
    private List<String> correctAnswers;


    public Question(QuestionDTO questionDTO, Quiz quiz) {
        this.number = questionDTO.getNumber();
        this.title = questionDTO.getTitle();
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
