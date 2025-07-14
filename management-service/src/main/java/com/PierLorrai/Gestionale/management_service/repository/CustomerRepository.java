package com.PierLorrai.Gestionale.management_service.repository;

import com.PierLorrai.Gestionale.management_service.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Potresti aggiungere: Optional<Customer> findByEmail(String email);
}
