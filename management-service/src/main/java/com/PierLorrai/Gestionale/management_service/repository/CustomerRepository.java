package com.PierLorrai.Gestionale.management_service.repository;

import com.PierLorrai.Gestionale.management_service.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Potresti aggiungere: Optional<Customer> findByEmail(String email);

    Optional<Customer> findByEmail(String email);
}
