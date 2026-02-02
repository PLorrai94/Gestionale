package com.PierLorrai.Gestionale.controller;

import com.PierLorrai.Gestionale.dto.AuthResponse;
import com.PierLorrai.Gestionale.dto.RefreshTokenRequest;
import com.PierLorrai.Gestionale.dto.UserLoginRequest;
import com.PierLorrai.Gestionale.dto.UserRegistrationRequest;
import com.PierLorrai.Gestionale.model.RefreshToken;
import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.service.AuthService;
import com.PierLorrai.Gestionale.service.JwtService;
import com.PierLorrai.Gestionale.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

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

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Received refresh token request");
        return refreshTokenService.verifyRefreshToken(request.getRefreshToken())
                .map(refreshToken -> {
                    User user = refreshToken.getUser();
                    String newAccessToken = jwtService.generateToken(user);
                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
                    refreshTokenService.revokeRefreshToken(request.getRefreshToken());
                    return ResponseEntity.ok(new AuthResponse(
                            newAccessToken, newRefreshToken.getToken(),
                            user.getUsername(), user.getEmail(), user.getId()));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Received logout request");
        refreshTokenService.revokeRefreshToken(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/users/{userId}/roles/{roleName}")
    @PreAuthorize("hasAuthority('ADMIN')")
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
