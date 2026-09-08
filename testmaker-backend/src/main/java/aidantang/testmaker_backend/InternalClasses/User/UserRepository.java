package aidantang.testmaker_backend.InternalClasses.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String>{

    Optional<User> findByProviderId(String providerId);

    User findByEmail(String email);

    @Query(value="SELECT COUNT(*) FROM users WHERE LOWER(display_name) =  LOWER(:displayName)", nativeQuery = true)
    int countByDisplayName(@Param("displayName") String displayName);

}
