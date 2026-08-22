package aidantang.testmaker_backend.InternalClasses.Question;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Answer.Answer;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String title;


    @Column(name="description")
    private String description;


    // type: String
    // type indicates what type of question this particular instance is
    // type can only be "SI" (Short Input), "MC" (Multiple Choice), or "TF" (True/False)
    @Column(name="type")
    private String type;


    @Column(name="hint")
    private String hint;


    @OneToMany(mappedBy="question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<Answer>();


}
