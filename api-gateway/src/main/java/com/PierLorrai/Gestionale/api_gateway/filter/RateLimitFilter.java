package com.PierLorrai.Gestionale.api_gateway.filter;

import com.PierLorrai.Gestionale.api_gateway.config.RateLimitProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class RateLimitFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(RateLimitFilter.class);
    private final RateLimitProperties rateLimitProperties;

    private final ConcurrentHashMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String clientIp = getClientIp(exchange);
        TokenBucket bucket = buckets.computeIfAbsent(clientIp,
                k -> new TokenBucket(rateLimitProperties.getBurstCapacity(), rateLimitProperties.getReplenishRate()));

        if (bucket.tryConsume()) {
            return chain.filter(exchange);
        }

        log.warn("Rate limit exceeded for IP: {}", clientIp);
        return onRateLimitExceeded(exchange);
    }

    private String getClientIp(ServerWebExchange exchange) {
        String forwarded = exchange.getRequest().getHeaders().getFirst("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        InetSocketAddress remoteAddress = exchange.getRequest().getRemoteAddress();
        if (remoteAddress != null) {
            InetAddress address = remoteAddress.getAddress();
            if (address != null) {
                return address.getHostAddress();
            }
        }
        return "unknown";
    }

    private Mono<Void> onRateLimitExceeded(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        response.getHeaders().set("Retry-After", "1");

        String body = String.format(
                "{\"timestamp\":\"%s\",\"status\":429,\"error\":\"Too Many Requests\",\"message\":\"Rate limit exceeded. Please try again later.\",\"path\":\"%s\"}",
                LocalDateTime.now(), exchange.getRequest().getPath().value()
        );
        DataBuffer buffer = response.bufferFactory().wrap(body.getBytes(StandardCharsets.UTF_8));
        return response.writeWith(Mono.just(buffer));
    }

    @Scheduled(fixedRate = 60000)
    public void cleanupStaleBuckets() {
        long now = System.currentTimeMillis();
        buckets.entrySet().removeIf(entry -> (now - entry.getValue().getLastAccessTime()) > 300_000);
    }

    @Override
    public int getOrder() {
        return -2;
    }

    private static class TokenBucket {
        private final int maxTokens;
        private final int refillRate;
        private final AtomicLong availableTokens;
        private volatile long lastRefillTime;
        private volatile long lastAccessTime;

        TokenBucket(int maxTokens, int refillRate) {
            this.maxTokens = maxTokens;
            this.refillRate = refillRate;
            this.availableTokens = new AtomicLong(maxTokens);
            this.lastRefillTime = System.currentTimeMillis();
            this.lastAccessTime = System.currentTimeMillis();
        }

        boolean tryConsume() {
            refill();
            this.lastAccessTime = System.currentTimeMillis();
            long current = availableTokens.get();
            while (current > 0) {
                if (availableTokens.compareAndSet(current, current - 1)) {
                    return true;
                }
                current = availableTokens.get();
            }
            return false;
        }

        private void refill() {
            long now = System.currentTimeMillis();
            long elapsed = now - lastRefillTime;
            long tokensToAdd = (elapsed * refillRate) / 1000;
            if (tokensToAdd > 0) {
                long newTokens = Math.min(maxTokens, availableTokens.get() + tokensToAdd);
                availableTokens.set(newTokens);
                lastRefillTime = now;
            }
        }

        long getLastAccessTime() {
            return lastAccessTime;
        }
    }
}
