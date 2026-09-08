package aidantang.testmaker_backend.InternalClasses.User;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import aidantang.testmaker_backend.DTOClasses.Sending.JSON.UserInfoDTO;
import jakarta.transaction.Transactional;

@Service 
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional 
    public ResponseEntity<UserInfoDTO> getUserDetails(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        UserInfoDTO result = new UserInfoDTO(user.getId(), user.getEmail(), user.getDisplayName());
        return ResponseEntity.ok(result);
        
    }

    @Transactional 
    public ResponseEntity<Void> updateUserDisplayName(Authentication auth, String newDisplayName) {
        User user = userRepository.findByEmail(auth.getName());
        if (user == null) return ResponseEntity.notFound().build();

        boolean alreadyExists = userRepository.countByDisplayName(newDisplayName) > 0;
        if (alreadyExists) return ResponseEntity.badRequest().build();

        user.setDisplayName(newDisplayName);
        userRepository.save(user);

        return ResponseEntity.ok().build();




    }
}

