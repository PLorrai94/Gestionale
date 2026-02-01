package com.PierLorrai.Gestionale.service;

import com.PierLorrai.Gestionale.dto.AuthResponse;
import com.PierLorrai.Gestionale.dto.UserLoginRequest;
import com.PierLorrai.Gestionale.dto.UserRegistrationRequest;
import com.PierLorrai.Gestionale.model.RefreshToken;
import com.PierLorrai.Gestionale.model.Role;
import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.exception.EmailAlreadyExistsException;
import com.PierLorrai.Gestionale.exception.PasswordMismatchException;
import com.PierLorrai.Gestionale.exception.RoleNotFoundException;
import com.PierLorrai.Gestionale.exception.UserNotFoundException;
import com.PierLorrai.Gestionale.exception.UsernameAlreadyExistsException;
import com.PierLorrai.Gestionale.repository.RoleRepository;
import com.PierLorrai.Gestionale.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    public AuthResponse register(UserRegistrationRequest request) {
        log.info("Attempting to register user: {}", request.getUsername());

        // Validate password confirmation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            log.warn("Registration failed: Password and confirmation do not match for user: {}", request.getUsername());
            throw new PasswordMismatchException("Password and confirmation do not match");
        }

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
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .build();
        user.getRoles().add(userRole);

        User savedUser = userRepository.save(user);
        log.info("User {} registered successfully with ID: {}", savedUser.getUsername(), savedUser.getId());

        var jwtToken = jwtService.generateToken(savedUser);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);

        return new AuthResponse(jwtToken, refreshToken.getToken(), savedUser.getUsername(), savedUser.getEmail(), savedUser.getId());
    }

    @Transactional
    public AuthResponse authenticate(UserLoginRequest request) {
        log.info("Attempting to authenticate user: {}", request.getUsername());

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    log.warn("User {} not found.", request.getUsername());
                    return new UsernameNotFoundException("Invalid credentials for user: " + request.getUsername());
                });

        // Check if the account is locked
        if (!user.isAccountNonLocked()) {
            if (user.getLockedUntil() != null && user.getLockedUntil().isBefore(LocalDateTime.now())) {
                user.setAccountNonLocked(true);
                user.setFailedLoginAttempts(0);
                user.setLockedUntil(null);
                userRepository.save(user);
            } else {
                log.warn("Account locked for user: {}", request.getUsername());
                throw new UsernameNotFoundException("Account is locked. Try again later.");
            }
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (org.springframework.security.core.AuthenticationException e) {
            log.warn("Authentication failed for user {}: {}", request.getUsername(), e.getMessage());
            int attempts = user.getFailedLoginAttempts() + 1;
            user.setFailedLoginAttempts(attempts);
            if (attempts >= 5) {
                user.setAccountNonLocked(false);
                user.setLockedUntil(LocalDateTime.now().plusMinutes(30));
                log.warn("Account locked for user {} after {} failed attempts.", request.getUsername(), attempts);
            }
            userRepository.save(user);
            throw new UsernameNotFoundException("Invalid credentials for user: " + request.getUsername());
        }

        // Successful authentication: reset failed attempts
        if (user.getFailedLoginAttempts() > 0) {
            user.setFailedLoginAttempts(0);
            userRepository.save(user);
        }

        var jwtToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        log.info("User {} authenticated successfully.", request.getUsername());
        return new AuthResponse(jwtToken, refreshToken.getToken(), user.getUsername(), user.getEmail(), user.getId());
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
