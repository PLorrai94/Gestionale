package com.PierLorrai.Gestionale.management_service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CUSTOMER") // Nome della tabella nel DB Oracle
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_seq")
    @SequenceGenerator(name = "customer_seq", sequenceName = "CUSTOMERS_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @NotBlank
    @Size(max = 100)
    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 150)
    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @Size(max = 30)
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;
}
