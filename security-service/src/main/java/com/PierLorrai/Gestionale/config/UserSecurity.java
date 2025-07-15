// D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/config/UserSecurity.java
package com.PierLorrai.Gestionale.config; // AGGIORNATO

import com.PierLorrai.Gestionale.model.User; // AGGIORNATO
import com.PierLorrai.Gestionale.repository.UserRepository; // AGGIORNATO
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("userSecurity") // Il nome del bean deve corrispondere a quello usato in @PreAuthorize
@RequiredArgsConstructor
public class UserSecurity {

    private final UserRepository userRepository;

    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        // Get the username of the currently authenticated user
        String currentUsername = authentication.getName();

        // Get the user from the database by ID
        Optional<User> userOptional = userRepository.findById(userId);

        // Check if the user exists and if their username matches the authenticated username
        return userOptional.map(user -> user.getUsername().equals(currentUsername)).orElse(false);
    }
}