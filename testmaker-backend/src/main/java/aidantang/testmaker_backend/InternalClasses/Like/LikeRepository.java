package aidantang.testmaker_backend.InternalClasses.Like;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Like, LikeId>{

   // @Query("SELECT COUNT(*) FROM likes WHERE user_id = :user_id AND quiz_id = :quiz_id", nativeQuery = true)
    //public int checkIfUserLikedQuizById(@Param("user_id") String userId, @Param("quiz_id") String quizId);

    public List<Like> findByIdUserIdAndIdQuizId(String userId, String quizId);

    
    @Modifying
    @Query("DELETE FROM Like l WHERE l.id.userId = :userId AND l.id.quizId = :quizId")
    public void deleteByUserIdAndQuizId(@Param("userId") String userId, @Param("quizId") String quizId);

    
}
