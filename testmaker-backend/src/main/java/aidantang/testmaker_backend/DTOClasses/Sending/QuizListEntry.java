package aidantang.testmaker_backend.DTOClasses.Sending;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class QuizListEntry {
    /*
    This class represents a singular entry within a list of Quizzes.
    WIll be used to represent a quiz during the Search functionality, and only
    contains basic information like the quiz's title, owner, id, etc.
     */

    private String id;

    private String userId;
    private String userDisplayName;

    private String image = "";

    private int likes;
    private int plays;
    private List<String> tags;

    private int dateCreated;
    private int dateUpdated;

    


}
