package aidantang.testmaker_backend.InternalClasses.Answer;

import aidantang.testmaker_backend.InternalClasses.Question.Question;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    /*
    The Answer class is an object that pertains to its parent Question class.
    This class contains one particular answer within its parent Question.

    e.g. 
    Question: What is the capital of France?
    
    Answer: A) Paris
     */


    // id: String
    // id is used to internally identify a particular answer to a question
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // correct: Boolean
    // Indicates if this answer is correct
    @Column(name="correct")
    private boolean correct;


    // content: String
    // Indicates what the answer is 
    @Column(name="content")
    private String content;


    // explanation: String
    // If the user selects this option, then when the answers are evaluated, it will display this message to them
    // This message may be used to explain why an answer is incorrect, or why it is correct
    @Column(name="explanation")
    private String explanation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="questionId", nullable = false)
    private Question question;

    
}
