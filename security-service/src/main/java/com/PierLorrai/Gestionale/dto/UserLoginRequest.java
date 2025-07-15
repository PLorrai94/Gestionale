// security-service/src/main/java/com/PierLorrai/Gestionale/securityservice/dto/UserLoginRequest.java
package com.PierLorrai.Gestionale.dto; // AGGIORNATO

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginRequest {
    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    private String password;
}