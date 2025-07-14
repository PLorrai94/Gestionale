package com.PierLorrai.Gestionale.api_gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

    private static final Logger logger = LoggerFactory.getLogger(LoggingGlobalFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Logga la richiesta in arrivo
        String requestPath = exchange.getRequest().getPath().value();
        String requestMethod = exchange.getRequest().getMethod().name();
        logger.info("Incoming Request: {} {}", requestMethod, requestPath);

        // Continua la catena di filtri e poi logga la risposta
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            int statusCode = exchange.getResponse().getStatusCode().value();
            logger.info("Outgoing Response: {} {} - Status: {}", requestMethod, requestPath, statusCode);
        }));
    }

    @Override
    public int getOrder() {
        // Definisce l'ordine di esecuzione del filtro. Ordered.LOWEST_PRECEDENCE lo esegue per ultimo.
        // Potresti volerlo eseguire prima o dopo altri filtri predefiniti.
        return Ordered.LOWEST_PRECEDENCE;
    }
}
