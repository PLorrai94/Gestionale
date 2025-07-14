package com.PierLorrai.Gestionale.controller;

import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/users") // Tutte le richieste a questo controller inizieranno con /api/users
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // Tutte le API in questo controller richiedono il ruolo ADMIN di default
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{userId}/roles")
    public ResponseEntity<User> assignRolesToUser(
            @PathVariable Long userId,
            @RequestBody Map<String, Set<String>> requestBody // Es: {"roleNames": ["ADMIN", "MANAGER"]}
    ) {
        Set<String> roleNames = requestBody.get("roleNames");
        if (roleNames == null || roleNames.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // O un messaggio di errore più specifico
        }
        try {
            User updatedUser = userService.assignRolesToUser(userId, roleNames);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // O HttpStatus.BAD_REQUEST se il ruolo non esiste
        }
    }
}
