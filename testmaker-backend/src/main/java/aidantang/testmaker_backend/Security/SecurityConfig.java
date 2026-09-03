package aidantang.testmaker_backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import aidantang.testmaker_backend.InternalClasses.User.User;
import aidantang.testmaker_backend.InternalClasses.User.UserRepository;

import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/private/**").authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(databaseJwtConverter()))
            );

        return http.build();
    }

    @Bean
    @Transactional
    public Converter<Jwt, AbstractAuthenticationToken> databaseJwtConverter() {
        return jwt -> {
            System.out.println("=== JWT Conversion Starting ===");
            System.out.println("JWT Subject: " + jwt.getSubject());
            System.out.println("JWT Claims: " + jwt.getClaims().keySet());
            
            String providerId = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            
            System.out.println("ProviderId: " + providerId);
            System.out.println("Email: " + email);

            // Either finds user or creates new user
            User user = userRepository.findByProviderId(providerId)
                .orElseGet(() -> {
                    System.out.println("Creating new user for providerId: " + providerId);
                    User newUser = new User();
                    newUser.setProviderId(providerId);
                    newUser.setEmail(email != null ? email : "no-email@provider.com");
                    newUser.setRoles(Set.of("ROLE_USER")); // Default role
                    return userRepository.save(newUser);
                });

            System.out.println("User ID: " + user.getId());
            System.out.println("User Email: " + user.getEmail());
            
            List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

            System.out.println("Authorities: " + authorities);
            System.out.println("=== JWT Conversion Complete ===");
            
            return new JwtAuthenticationToken(jwt, authorities, user.getEmail());
        };
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
