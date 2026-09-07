package aidantang.testmaker_backend.InternalClasses.Quiz;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface QuizRepository extends JpaRepository<Quiz, String>{


    /*
    
    @Query("SELECT * FROM quizzes WHERE tags IN :inputTags OR title LIKE '%:searchQuery%'", nativeQuery=true)
    public List<Quiz> getQuizListBySearch(@Param("inputTags") List<String> tags, @Param("searchQuery") String searchQuery);

    */

    @Query("SELECT q FROM quizzes q WHERE q.user.id = :userId ORDER BY q.dateUpdated DESC")
    public List<Quiz> getUserOwnQuizListByLastUpdated(@Param("userId") String userId);

    // Search Methods
    // Occur when a user wants to search for quizzes using a specific search term
    // Users can search by LIKES, PLAYS, or by most recent UPDATE

    @Query(value="SELECT * FROM quizzes WHERE title ILIKE CONCAT('%', :searchParam, '%') OR description ILIKE CONCAT('%', :searchParam, '%') OR CONCAT('%', :searchParam, '%') ILIKE ANY(tags) ORDER BY plays DESC LIMIT :limit OFFSET :offset", nativeQuery=true)
    public List<Quiz> searchQuizzesByPlays(
        @Param("searchParam") String stearchParam,
        @Param("limit") int limit,
        @Param("offset") int offset);

    
    @Query(value="SELECT * FROM quizzes WHERE title ILIKE CONCAT('%', :searchParam, '%') OR description ILIKE CONCAT('%', :searchParam, '%') OR CONCAT('%', :searchParam, '%') ILIKE ANY(tags) ORDER BY likes DESC LIMIT :limit OFFSET :offset", nativeQuery=true)
    public List<Quiz> searchQuizzesByLikes(
        @Param("searchParam") String stearchParam,
        @Param("limit") int limit,
        @Param("offset") int offset);


     @Query(value="SELECT * FROM quizzes WHERE title ILIKE CONCAT('%', :searchParam, '%') OR description ILIKE CONCAT('%', :searchParam, '%') OR CONCAT('%', :searchParam, '%') ILIKE ANY(tags) ORDER BY date_updated DESC LIMIT :limit OFFSET :offset", nativeQuery=true)
    public List<Quiz> searchQuizzesByUpdate(
        @Param("searchParam") String stearchParam,
        @Param("limit") int limit,
        @Param("offset") int offset);


    
}
