package com.PierLorrai.Gestionale.ui_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UiController {

    private final WebClient.Builder webClientBuilder;

    @Value("${api.gateway.url}") // Inietta l'URL dell'API Gateway dal application.yml
    private String apiGatewayUrl;

    @GetMapping("/")
    public String home() {
        return "index"; // Ritorna il nome del template Thymeleaf (index.html)
    }

    @GetMapping("/products")
    public String getProducts(Model model) {
        // Costruisci l'URL completo per chiamare l'API Gateway per i prodotti
        String productsApiUrl = apiGatewayUrl + "/api/management/products";

        // Effettua la chiamata HTTP all'API Gateway usando WebClient
        Mono<List<Product>> productsMono = webClientBuilder.build()
                .get()
                .uri(productsApiUrl)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Product>>() {}); // Per deserializzare una lista

        // Gestisce la risposta in modo reattivo
        productsMono.subscribe(
                products -> {
                    model.addAttribute("products", products);
                },
                error -> {
                    model.addAttribute("errorMessage", "Error fetching products: " + error.getMessage());
                    System.err.println("Error fetching products: " + error.getMessage());
                }
        );

        // Blocca per attendere la risposta (per semplicità in un'app MVC sincrona)
        // In un'applicazione completamente reattiva, non bloccheresti.
        try {
            List<Product> products = productsMono.block();
            model.addAttribute("products", products);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "Error fetching products: " + e.getMessage());
            System.err.println("Error fetching products: " + e.getMessage());
        }

        return "products"; // Ritorna il template products.html
    }

    // TODO: Aggiungere altri metodi per clienti, ordini, autenticazione, ecc.
    // Per l'autenticazione, dovrai gestire la sessione utente e i JWT.
    // Questo è un esempio molto semplificato.

    // Endpoint per avviare il job batch (solo a scopo dimostrativo, senza UI dedicata)
    @GetMapping("/batch/start-process-orders-job")
    public String startBatchJob(Model model) {
        String batchApiUrl = apiGatewayUrl + "/api/batch/start-process-orders-job";

        Mono<String> responseMono = webClientBuilder.build()
                .post()
                .uri(batchApiUrl)
                .retrieve()
                .bodyToMono(String.class);

        try {
            String response = responseMono.block();
            model.addAttribute("message", "Batch Job Started: " + response);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "Error starting batch job: " + e.getMessage());
            System.err.println("Error starting batch job: " + e.getMessage());
        }

        return "index"; // Torna alla home o a una pagina di conferma
    }
}
