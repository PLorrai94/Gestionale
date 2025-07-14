package com.PierLorrai.Gestionale.management_service.repository;

import com.PierLorrai.Gestionale.management_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Data JPA fornirà i metodi CRUD
}
