package com.PierLorrai.Gestionale.repository;

import com.PierLorrai.Gestionale.model.RefreshToken;
import com.PierLorrai.Gestionale.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
    void deleteByExpiresAtBefore(LocalDateTime now);
}
