package com.PierLorrai.Gestionale.management_service.service;

import com.PierLorrai.Gestionale.management_service.model.Customer;
import com.PierLorrai.Gestionale.management_service.model.Order;
import com.PierLorrai.Gestionale.management_service.model.OrderItem;
import com.PierLorrai.Gestionale.management_service.model.Product;
import com.PierLorrai.Gestionale.management_service.repository.CustomerRepository;
import com.PierLorrai.Gestionale.management_service.repository.OrderRepository;
import com.PierLorrai.Gestionale.management_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public Page<Order> getAllOrders(Pageable pageable, String search) {
        if (search != null && !search.isBlank()) {
            return orderRepository.findByStatusContainingIgnoreCase(search, pageable);
        }
        return orderRepository.findAll(pageable);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrder(Order order) {
        Customer customer = customerRepository.findById(order.getCustomer().getId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + order.getCustomer().getId()));
        order.setCustomer(customer);

        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        BigDecimal totalAmount = BigDecimal.ZERO;

        if (order.getItems() != null && !order.getItems().isEmpty()) {
            for (OrderItem item : order.getItems()) {
                Product product = productRepository.findById(item.getProduct().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + item.getProduct().getId()));

                if (product.getStock() < item.getQuantity()) {
                    throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
                }

                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);

                item.setProduct(product);
                item.setOrder(order);
                item.setUnitPrice(product.getPrice());
                totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            }
        } else {
            throw new IllegalArgumentException("Order must contain at least one item.");
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(Long id, String newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));

        if (order.getStatus().equals("CANCELLED")) {
            throw new IllegalArgumentException("Order is already cancelled.");
        }

        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new IllegalArgumentException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
}
