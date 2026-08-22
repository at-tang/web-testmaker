package aidantang.testmaker_backend.InternalClasses.Quiz;

import java.util.ArrayList;
import java.util.List;

import aidantang.testmaker_backend.InternalClasses.Question.Question;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;


    @Column(name="topic")
    private String topic;

    @Column(name="totalRating")
    private int totalRating;

    @Column(name="totalUsersRated")
    private int totalUsersRated;

    @OneToMany(mappedBy="quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<Question>();

}
