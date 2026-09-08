package aidantang.testmaker_backend.Security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/hello")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("Public endpoint works!");
    }

    @GetMapping("/private/me")
    public ResponseEntity<String> privateEndpoint(Authentication auth) {
        return ResponseEntity.ok("Hello authenticated user: " + auth.getName() + " " + auth.getPrincipal() + " " + auth.getCredentials());
    }

    @GetMapping("/private/me2")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> privateEndpoint2(Authentication auth) {
        return ResponseEntity.ok("Hello authenticated user: " + auth.getName() + " " + auth.getPrincipal().toString() + " " + auth.getCredentials().toString());
    }

    @GetMapping("/admin/secret")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("Admin-only data.");
    }
}
