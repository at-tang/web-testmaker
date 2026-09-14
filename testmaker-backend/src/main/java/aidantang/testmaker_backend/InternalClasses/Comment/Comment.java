package aidantang.testmaker_backend.InternalClasses.Comment;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import aidantang.testmaker_backend.InternalClasses.Comment.DTOs.Receiving.NewCommentDTO;
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

@Entity(name="comments")
@Table 
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class Comment {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    @JsonIgnore 
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="quizId")
    @JsonIgnore 
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parentId")
    private Comment parent;

    @OneToMany(mappedBy="parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies;

    @Column(name = "status")
    private CommentStatusEnum status = CommentStatusEnum.ACTIVE;

    @Column(name = "datePosted")
    private Long datePosted;

    public Comment(NewCommentDTO newComment, User user, Quiz quiz) {
        this.content = newComment.getContent();
        this.datePosted = Instant.now().getEpochSecond();
        this.user = user;
        this.quiz = quiz;
        this.replies = new ArrayList<>();
        this.status = CommentStatusEnum.ACTIVE;
    }

    public Comment(NewCommentDTO newComment, User user, Quiz quiz, Comment parent) {
        this.content = newComment.getContent();
        this.datePosted = Instant.now().getEpochSecond();
        this.user = user;
        this.quiz = quiz;
        this.replies = new ArrayList<>();
        this.status = CommentStatusEnum.ACTIVE;
        this.parent = parent;
    }

    
}
