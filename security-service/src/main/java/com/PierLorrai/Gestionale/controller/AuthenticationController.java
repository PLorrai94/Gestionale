package com.PierLorrai.Gestionale.controller;

import com.PierLorrai.Gestionale.dto.AuthenticationRequest;
import com.PierLorrai.Gestionale.dto.AuthenticationResponse;
import com.PierLorrai.Gestionale.dto.RegisterRequest;
import com.PierLorrai.Gestionale.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth") // Tutte le richieste a questo controller inizieranno con /api/auth
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthenticationResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Gestione di username/email già esistenti o altri errori di registrazione
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthenticationResponse.builder().token(e.getMessage()).build());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) { // Cattura eventuali BadCredentialsException o altre eccezioni di autenticazione
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthenticationResponse.builder().token(e.getMessage()).build());
        }
    }
}
