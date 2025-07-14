package com.PierLorrai.Gestionale.common;



import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByStatus(String status); // Nuovo metodo per Spring Batch ItemReader
}
