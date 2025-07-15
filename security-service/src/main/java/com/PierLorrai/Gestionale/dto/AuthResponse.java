// security-service/src/main/java/com/PierLorrai/Gestionale/securityservice/dto/AuthResponse.java
package com.PierLorrai.Gestionale.dto; // AGGIORNATO

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String email;
    private Long id;
}