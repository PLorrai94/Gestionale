// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/AuthService.java
package com.PierLorrai.Gestionale.service; // AGGIORNATO

import com.PierLorrai.Gestionale.dto.AuthResponse; // AGGIORNATO
import com.PierLorrai.Gestionale.dto.UserLoginRequest; // AGGIORNATO
import com.PierLorrai.Gestionale.dto.UserRegistrationRequest; // AGGIORNATO
import com.PierLorrai.Gestionale.model.Role; // AGGIORNATO
import com.PierLorrai.Gestionale.model.User; // AGGIORNATO
import com.PierLorrai.Gestionale.exception.EmailAlreadyExistsException; // AGGIORNATO
import com.PierLorrai.Gestionale.exception.RoleNotFoundException; // AGGIORNATO
import com.PierLorrai.Gestionale.exception.UserNotFoundException; // AGGIORNATO
import com.PierLorrai.Gestionale.exception.UsernameAlreadyExistsException; // AGGIORNATO
import com.PierLorrai.Gestionale.repository.RoleRepository; // AGGIORNATO
import com.PierLorrai.Gestionale.repository.UserRepository; // AGGIORNATO
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(UserRegistrationRequest request) {
        log.info("Attempting to register user: {}", request.getUsername());

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            log.warn("Registration failed: Username {} already taken.", request.getUsername());
            throw new UsernameAlreadyExistsException("Username " + request.getUsername() + " already taken.");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Registration failed: Email {} already registered.", request.getEmail());
            throw new EmailAlreadyExistsException("Email " + request.getEmail() + " already registered.");
        }

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> {
                    log.error("Role 'USER' not found in database.");
                    return new RoleNotFoundException("Role 'USER' not found. Please ensure it's created.");
                });

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        user.getRoles().add(userRole);

        User savedUser = userRepository.save(user);
        log.info("User {} registered successfully with ID: {}", savedUser.getUsername(), savedUser.getId());

        var jwtToken = jwtService.generateToken(savedUser);
        return new AuthResponse(jwtToken, savedUser.getUsername(), savedUser.getEmail(), savedUser.getId());
    }

    public AuthResponse authenticate(UserLoginRequest request) {
        log.info("Attempting to authenticate user: {}", request.getUsername());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (org.springframework.security.core.AuthenticationException e) {
            log.warn("Authentication failed for user {}: {}", request.getUsername(), e.getMessage());
            throw new UsernameNotFoundException("Invalid credentials for user: " + request.getUsername());
        }

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    log.error("Authenticated user {} not found in repository.", request.getUsername());
                    return new UsernameNotFoundException("User not found after authentication.");
                });

        var jwtToken = jwtService.generateToken(user);
        log.info("User {} authenticated successfully.", request.getUsername());
        return new AuthResponse(jwtToken, user.getUsername(), user.getEmail(), user.getId());
    }

    @Transactional
    public User assignRoleToUser(Long userId, String roleName) {
        log.info("Assigning role {} to user with ID: {}", roleName, userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User with ID {} not found for role assignment.", userId);
                    return new UserNotFoundException("User with ID " + userId + " not found.");
                });

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> {
                    log.warn("Role {} not found for assignment to user {}.", roleName, userId);
                    return new RoleNotFoundException("Role " + roleName + " not found.");
                });

        user.getRoles().add(role);
        User updatedUser = userRepository.save(user);
        log.info("Role {} assigned to user {}.", roleName, user.getUsername());
        return updatedUser;
    }
}