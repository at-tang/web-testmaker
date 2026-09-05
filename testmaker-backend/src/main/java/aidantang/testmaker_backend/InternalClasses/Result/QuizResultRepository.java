package aidantang.testmaker_backend.InternalClasses.Result;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface QuizResultRepository extends JpaRepository<QuizResult, String> {

    @Query(value="SELECT * FROM results WHERE user_id = :userId ORDER BY date_attempted_seconds DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
        public List<QuizResult> getUserQuizResultHistoryByPage(@Param("userId") String userId, @Param("limit") int limit, @Param("offset") int offset);

    @Query(value="SELECT COUNT(user_id = :userId) FROM results", nativeQuery=true)
    public int countAllResultsByUserId(@Param("userId") String userId);
    

    
} 
