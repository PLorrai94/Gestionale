package com.PierLorrai.Gestionale.management_service.repository;

import com.PierLorrai.Gestionale.management_service.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Metodi specifici per OrderItem se necessari, es. findByOrderId
}
