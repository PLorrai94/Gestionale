package com.PierLorrai.Gestionale.api_gateway.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "application.rate-limit")
public class RateLimitProperties {
    private int replenishRate = 50;
    private int burstCapacity = 100;
}
