package aidantang.testmaker_backend.DTOClasses.Sending.QuizResultList;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class QuizResultList {
    
    // Lists the total amount of entries that fit the criteria requested by the frontend
    // e.g. how many QuizResults does the user possess?
    private int numberOfEntries; 

    private List<QuizResultListEntryDTO> entries;
}
