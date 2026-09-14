package aidantang.testmaker_backend.InternalClasses.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value="SELECT * FROM comments WHERE quiz_id = :quiz_id AND date_posted <= :timestamp AND parent_id IS NULL ORDER BY date_posted DESC LIMIT :limit OFFSET :offset", nativeQuery=true)
    public List<Comment> getAllCommentsByQuiz(@Param("quiz_id") String quizId, @Param("offset") int offset, @Param("limit") int limit, @Param("timestamp") long timestamp);

    @Query(value="SELECT COUNT(*) FROM comments WHERE quiz_id = :quiz_id AND parent_id IS NULL", nativeQuery = true)
    public Long countAllCommentsByQuiz(@Param("quiz_id") String quizId);


    
    
}
