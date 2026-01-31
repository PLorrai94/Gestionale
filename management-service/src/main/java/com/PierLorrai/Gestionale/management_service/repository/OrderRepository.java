package com.PierLorrai.Gestionale.management_service.repository;

import com.PierLorrai.Gestionale.management_service.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByStatus(String status);
    Page<Order> findByStatusContainingIgnoreCase(String status, Pageable pageable);
}
