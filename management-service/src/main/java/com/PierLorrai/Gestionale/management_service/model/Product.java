package com.PierLorrai.Gestionale.management_service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
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
@Table(name = "PRODUCT") // Nome della tabella nel DB Oracle
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCTS_SEQ")
    @SequenceGenerator(name = "PRODUCTS_SEQ", sequenceName = "PRODUCTS_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 200)
    @Column(name = "NAME", nullable = false)
    private String name;

    @Size(max = 1000)
    @Column(name = "DESCRIPTION")
    private String description;

    @NotNull
    @DecimalMin(value = "0.00", inclusive = true)
    @Column(name = "PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull
    @PositiveOrZero
    @Column(name = "STOCK", nullable = false)
    private Integer stock;
}