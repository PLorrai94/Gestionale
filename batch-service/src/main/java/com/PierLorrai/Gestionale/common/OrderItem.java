package com.PierLorrai.Gestionale.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ORDER_ITEMS") // Nome della tabella nel DB Oracle
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_seq")
    @SequenceGenerator(name = "order_item_seq", sequenceName = "ORDER_ITEMS_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID", nullable = false)
    @JsonIgnore // Evita che OrderItem tenti di serializzare l'intero oggetto Order, prevenendo cicli infiniti
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Product product;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @Column(name = "UNIT_PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
}
