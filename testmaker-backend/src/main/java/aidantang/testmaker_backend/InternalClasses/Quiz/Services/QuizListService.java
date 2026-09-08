package aidantang.testmaker_backend.InternalClasses.Quiz.Services;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Sending.DisplayQuizDTO;
import aidantang.testmaker_backend.DTOClasses.Sending.QuizListDTO;
import aidantang.testmaker_backend.InternalClasses.Like.LikeRepository;
import aidantang.testmaker_backend.InternalClasses.Quiz.Quiz;
import aidantang.testmaker_backend.InternalClasses.Quiz.QuizRepository;
import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;

@Service
public class QuizListService {
    /*
    This particular service focuses on loading lists of quizzes at the time,
    most often for searching for quizzes or a user looking at their own quizzes
     */

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public QuizListService(QuizRepository quizRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;

    }

    public ResponseEntity<List<DisplayQuizDTO>> getUserOwnQuizListByLastUpdated(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        List<Quiz> quizzes = quizRepository.getUserOwnQuizListByLastUpdated(user.getId());
        List<DisplayQuizDTO> result = new ArrayList<>();
        for (Quiz quiz : quizzes) {

            boolean liked = likeRepository.existsByUserIdAndQuizId(user.getId(), quiz.getId());
            result.add(new DisplayQuizDTO(quiz, liked, user.getId()));
        }

        return ResponseEntity.ok(result);
        
    }


    public ResponseEntity<QuizListDTO> getPublicQuizzesBySearchPrivate(
        Authentication auth,
        String sortType, // either "top", "likes", "recent", which sort by number of plays, likes, or most recently updated
        int pageRequested, // What page is being requested. e.g. page 7, 9. Determines offset needed
        int entriesPerPage, // How many quizzes are shown per page. Determines offset and limit
        String searchQuery
    ) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        List<Quiz> quizzes = new ArrayList<>();

        System.out.println("PAGE REQUESTED: " + pageRequested);
        System.out.println("ENTRIES PER PAGE: " + entriesPerPage);
        System.out.println("SEARCH QUERY: " + searchQuery);
        System.out.println("SORT TYPE: " + sortType);



        int limit = entriesPerPage; // How many elements in list. Mainly here for clarity
        int offset = entriesPerPage * (Math.max(0, pageRequested - 1)); // How many entries to offset, or entries the user has already seen

        int total = quizRepository.countPublicQuizzesBySearchQuery(searchQuery);

        System.out.println("SORT TYPE GIVEN: " + sortType);

        if (sortType.equals( "top")) {
            System.out.println("ENTERING TOP");
            quizzes = quizRepository.searchPublicQuizzesByPlays(searchQuery, limit, offset);
        }

        else if (sortType.equals("likes")) {
            System.out.println("ENTERING LIKES");
            quizzes = quizRepository.searchPublicQuizzesByLikes(searchQuery, limit, offset);
        }

        else if (sortType.equals("recent")) {
            System.out.println("ENTERING RECENT");
            quizzes = quizRepository.searchPublicQuizzesByUpdate(searchQuery, limit, offset);
        }

        else { 
            System.out.println("ENTERING ERROR");
            return ResponseEntity.badRequest().build();}

        List<DisplayQuizDTO> result = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            boolean liked = likeRepository.existsByUserIdAndQuizId(user.getId(), quiz.getId());
            result.add(new DisplayQuizDTO(quiz,liked,user.getId() ));
        }

        return ResponseEntity.ok(new QuizListDTO(total, result));
    }

}
