package aidantang.testmaker_backend.DTOClasses.Sending.JSON;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class UserInfoDTO {
    /*
    Contains all user information

    Generally used when a user wants to access Settings
     */
    private String id;
    private String email;
    private String displayName;

}
