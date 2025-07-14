package com.PierLorrai.Gestionale.management_service.service;

import com.PierLorrai.Gestionale.management_service.model.Customer;
import com.PierLorrai.Gestionale.management_service.model.Order;
import com.PierLorrai.Gestionale.management_service.model.OrderItem;
import com.PierLorrai.Gestionale.management_service.model.Product;
import com.PierLorrai.Gestionale.management_service.repository.CustomerRepository;
import com.PierLorrai.Gestionale.management_service.repository.OrderRepository;
import com.PierLorrai.Gestionale.management_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
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

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        // Fetch eager di customer e items per evitare problemi di LazyInitializationException
        return orderRepository.findById(id);
    }

    @Transactional // Garantisce che tutte le operazioni all'interno del metodo siano atomiche
    public Order createOrder(Order order) {
        // 1. Verifica e recupera il Cliente
        Customer customer = customerRepository.findById(order.getCustomer().getId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + order.getCustomer().getId()));
        order.setCustomer(customer);

        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING"); // Stato iniziale dell'ordine

        BigDecimal totalAmount = BigDecimal.ZERO;

        // 2. Elabora gli OrderItem, verifica lo stock e calcola il totale
        if (order.getItems() != null && !order.getItems().isEmpty()) {
            for (OrderItem item : order.getItems()) {
                Product product = productRepository.findById(item.getProduct().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + item.getProduct().getId()));

                if (product.getStock() < item.getQuantity()) {
                    throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
                }

                // Aggiorna lo stock del prodotto
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product); // Salva il prodotto con stock aggiornato

                item.setProduct(product); // Associa il prodotto gestito da JPA
                item.setOrder(order); // Associa l'OrderItem all'ordine padre
                item.setUnitPrice(product.getPrice()); // Imposta il prezzo unitario dal prodotto attuale
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

        // Qui potresti aggiungere una logica per validare la transizione di stato
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    // Potresti voler implementare un metodo per annullare l'ordine e ripristinare lo stock
    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));

        if (order.getStatus().equals("CANCELLED")) {
            throw new IllegalArgumentException("Order is already cancelled.");
        }

        // Ripristina lo stock per ogni item dell'ordine
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
