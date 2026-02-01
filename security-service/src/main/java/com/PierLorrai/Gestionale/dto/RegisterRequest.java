package com.PierLorrai.Gestionale.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @deprecated Use {@link UserRegistrationRequest} instead for registration.
 * This class is kept for backward compatibility but should not be used in new code.
 */
@Deprecated(since = "2026-01-31", forRemoval = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}
