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


    
}
