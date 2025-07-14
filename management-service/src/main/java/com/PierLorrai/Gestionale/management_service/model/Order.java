package com.PierLorrai.Gestionale.management_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ORDERS") // Nome della tabella nel DB Oracle
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_seq")
    @SequenceGenerator(name = "order_seq", sequenceName = "ORDERS_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Molti ordini per un cliente, caricamento pigro
    @JoinColumn(name = "CUSTOMER_ID", nullable = false) // Colonna FK per il cliente
    private Customer customer;

    @Column(name = "ORDER_DATE", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "TOTAL_AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "STATUS", nullable = false)
    private String status; // Es: PENDING, COMPLETED, CANCELLED

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    // Un ordine ha molte OrderItem, cascade ALL per salvare/aggiornare/cancellare item con l'ordine
    private List<OrderItem> items;
}
