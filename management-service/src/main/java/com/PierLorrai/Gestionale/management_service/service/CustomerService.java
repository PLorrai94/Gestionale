package com.PierLorrai.Gestionale.management_service.service;

import com.PierLorrai.Gestionale.management_service.exception.DuplicateEmailException;
import com.PierLorrai.Gestionale.management_service.model.Customer;
import com.PierLorrai.Gestionale.management_service.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new DuplicateEmailException("Email già registrata: " + customer.getEmail());
        }
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente non trovato con ID: " + id));

        existing.setFirstName(customerDetails.getFirstName());
        existing.setLastName(customerDetails.getLastName());
        existing.setEmail(customerDetails.getEmail());
        existing.setPhoneNumber(customerDetails.getPhoneNumber());

        return customerRepository.save(existing);
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalArgumentException("Cliente non trovato con ID: " + id);
        }
        customerRepository.deleteById(id);
    }
}
