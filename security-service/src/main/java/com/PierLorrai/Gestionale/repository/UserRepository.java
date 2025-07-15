// Example: D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/repository/UserRepository.java
package com.PierLorrai.Gestionale.repository; // AGGIORNATO

import com.PierLorrai.Gestionale.model.User; // AGGIORNATO
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}