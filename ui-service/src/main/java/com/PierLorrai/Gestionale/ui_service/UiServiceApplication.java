package com.PierLorrai.Gestionale.ui_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@EnableDiscoveryClient // Per registrarsi con Eureka
public class UiServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UiServiceApplication.class, args);
	}

	// Bean per WebClient, lo useremo per fare chiamate HTTP all'API Gateway
	@Bean
	public WebClient.Builder webClientBuilder() {
		return WebClient.builder();
	}
}
