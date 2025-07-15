// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/controller/UserController.java
package com.PierLorrai.Gestionale.controller;

import com.PierLorrai.Gestionale.exception.UserNotFoundException;
import com.PierLorrai.Gestionale.model.User;
import com.PierLorrai.Gestionale.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("Request to get all users.");
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (isAuthenticated() and @userSecurity.isCurrentUser(#id))")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        log.info("Request to get user with ID: {}", id);
        User user = userService.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        return ResponseEntity.ok(user);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Di solito la creazione utenti è solo per admin o tramite endpoint /auth/register
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) { // Parametro User direttamente per semplicità, puoi usare DTO
        log.info("Request to create user: {}", user.getUsername());
        User createdUser = userService.createUser(user); // CHIAMATA AGGIUSTATA
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (isAuthenticated() and @userSecurity.isCurrentUser(#id))")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        log.info("Request to update user with ID: {}", id);
        User updatedUser = userService.updateUser(id, userDetails); // CHIAMATA AGGIUSTATA
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (isAuthenticated() and @userSecurity.isCurrentUser(#id))")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        log.info("Request to delete user with ID: {}", id);
        userService.deleteUser(id);
    }

    @PostMapping("/{userId}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> assignRolesToUser(@PathVariable Long userId, @RequestBody Set<String> roleNames) { // CHIAMATA AGGIUSTATA
        log.info("Request to assign roles {} to user with ID: {}", roleNames, userId);
        User updatedUser = userService.assignRolesToUser(userId, roleNames);
        return ResponseEntity.ok(updatedUser);
    }
}