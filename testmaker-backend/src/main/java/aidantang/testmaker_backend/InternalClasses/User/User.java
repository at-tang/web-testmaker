package aidantang.testmaker_backend.InternalClasses.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Result.QuizResult;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;


@Entity(name="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name="email")
    private String email;

    @Column(name="providerId")
    private String providerId;

    // The user's display name. 
    @Column(name="displayName", unique=true)
    private String displayName;

    @Column(name="profilePicture") // Stores a link to the user's Profile Picture
    private String profilePicture;


    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name="roles")
    private Set<String> roles = new HashSet<>();

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quiz> quizzes;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizResult> quizResults;
    

}
