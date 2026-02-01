// security-service/src/main/java/com/PierLorrai/Gestionale/securityservice/dto/UserRegistrationRequest.java
package com.PierLorrai.Gestionale.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationRequest {
    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]$", 
             message = "Username must start and end with a letter or number, and can only contain letters, numbers, dots, underscores, and hyphens in between")
    private String username;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
        regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$",
        message = "Password must contain at least one digit, one lowercase letter, one uppercase letter, and no whitespace"
    )
    private String password;

    @NotBlank(message = "Password confirmation cannot be empty")
    private String confirmPassword;

    @Size(max = 50, message = "First name cannot exceed 50 characters")
    private String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    private String lastName;

    @Pattern(regexp = "^$|^\\+?[0-9\\s\\-()]{7,20}$", message = "Invalid phone number format. Use international format with optional + prefix")
    private String phoneNumber;
}
