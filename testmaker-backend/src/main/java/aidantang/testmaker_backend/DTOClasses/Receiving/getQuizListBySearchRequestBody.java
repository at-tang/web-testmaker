package aidantang.testmaker_backend.DTOClasses.Receiving;

import java.util.List;

import lombok.Data;

@Data
public class getQuizListBySearchRequestBody {
    private List<String> tags;
    private String searchQuery;
    private int resultsPerPage;
    private int page;
}
