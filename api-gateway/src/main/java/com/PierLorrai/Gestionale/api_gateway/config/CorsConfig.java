package com.PierLorrai.Gestionale.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:4200"); // Consenti il dominio della tua app Angular
        corsConfig.addAllowedMethod("*"); // Consenti tutti i metodi (GET, POST, PUT, DELETE, ecc.)
        corsConfig.addAllowedHeader("*"); // Consenti tutti gli header
        corsConfig.setAllowCredentials(true); // Se usi credenziali (es. cookie, auth header)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Applica questa configurazione a tutte le rotte

        return new CorsWebFilter(source);
    }
}
