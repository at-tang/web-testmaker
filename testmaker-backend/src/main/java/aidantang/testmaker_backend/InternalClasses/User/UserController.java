package aidantang.testmaker_backend.InternalClasses.User;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aidantang.testmaker_backend.DTOClasses.Sending.JSON.UserInfoDTO;

@RestController 
@RequestMapping("/api/private/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/get")
    public ResponseEntity<UserInfoDTO> getUserDetails(Authentication auth) {
        return userService.getUserDetails(auth);
    }


    @PutMapping("/update/display_name")
    public ResponseEntity<Void> updateUserDisplayName(Authentication auth, @RequestParam(name = "new_display_name", required=true) String newDisplayName) {
        return userService.updateUserDisplayName(auth, newDisplayName);
    }


    
}
