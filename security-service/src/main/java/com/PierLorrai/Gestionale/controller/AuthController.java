// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/controller/AuthController.java
package com.PierLorrai.Gestionale.controller; // AGGIORNATO

import com.PierLorrai.Gestionale.dto.AuthResponse; // AGGIORNATO
import com.PierLorrai.Gestionale.dto.UserLoginRequest; // AGGIORNATO
import com.PierLorrai.Gestionale.dto.UserRegistrationRequest; // AGGIORNATO
import com.PierLorrai.Gestionale.model.User; // AGGIORNATO (import da model)
import com.PierLorrai.Gestionale.service.AuthService; // AGGIORNATO (import da service)
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        log.info("Received registration request for username: {}", request.getUsername());
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody UserLoginRequest request) {
        log.info("Received authentication request for username: {}", request.getUsername());
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{userId}/roles/{roleName}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> assignRole(@PathVariable Long userId, @PathVariable String roleName) {
        log.info("Assigning role '{}' to user ID {}", roleName, userId);
        User updatedUser = authService.assignRoleToUser(userId, roleName);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/test")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> testProtectedEndpoint() {
        log.info("Accessing protected test endpoint.");
        return ResponseEntity.ok("This is a protected endpoint for authenticated users!");
    }
}