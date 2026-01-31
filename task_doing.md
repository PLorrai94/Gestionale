 Explore(Explore error handling patterns)
  ⎿  Prompt:
       In D:\Progetti\Git\Gestionale, I need to understand the exact current state of error handling and exception classes across all services. Read these files completely:

       1. security-service GlobalExceptionHandler and all custom exceptions
       2. management-service GlobalExceptionHandler and all custom exceptions
       3. All existing DTO classes in both services
       4. The exact Flyway migration files to understand the current DB schema

       Search for:
       - All files named Exception.java
       - All files named GlobalExceptionHandler.java
       - All files named Dto.java or DTO.java or Response.java or Request.java
       - All Flyway migration SQL files (db/migration/*.sql)

       Read every file found and report the full contents.
  ⎿  ❯ In D:\Progetti\Git\Gestionale, I need to understand the exact current state of error handling and exception classes across all services. Read these files completely:

       1. security-service GlobalExceptionHandler and all custom exceptions
       2. management-service GlobalExceptionHandler and all custom exceptions
       3. All existing DTO classes in both services
       4. The exact Flyway migration files to understand the current DB schema

       Search for:
       - All files named *Exception*.java
       - All files named *GlobalExceptionHandler*.java
       - All files named *Dto*.java or *DTO*.java or *Response*.java or *Request*.java
       - All Flyway migration SQL files (db/migration/*.sql)

       Read every file found and report the full contents.
  ⎿  Search(pattern: "**/*Exception*.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  Search(pattern: "**/*GlobalExceptionHandler*.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  Search(pattern: "**/*Dto.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  

  ⎿  

  ⎿  

  ⎿  Search(pattern: "**/*DTO.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  Search(pattern: "**/*Response.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  Search(pattern: "**/*Request.java", path: "D:\Progetti\Git\Gestionale")

  ⎿  

  ⎿  

  ⎿  

  ⎿  Search(pattern: "**/db/migration/*.sql", path: "D:\Progetti\Git\Gestionale")

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\GlobalExceptionHandler.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\UsernameAlreadyExistsException.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\EmailAlreadyExistsException.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\UserNotFoundException.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\RoleNotFoundException.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\exception\GlobalExceptionHandler.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\exception\DuplicateEmailException.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\AuthenticationResponse.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\AuthResponse.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\AuthenticationRequest.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\RegisterRequest.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\UserRegistrationRequest.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\UserLoginRequest.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V1__create_security_tables.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V2__insert_initial_roles.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V3__grant_permissions_to_security_user.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V4__create_management_tables.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V5__insert_initial_customers.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V6__insert_initial_products.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V7__add_status_enum_to_orders.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V8__grant_permissions_to_management_user.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V9__align_schema_to_entities.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V10__create_sequences.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V11__grant_management_privileges.sql)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\db\migration\V12__add_account_lockout_columns.sql)

  ⎿  

  ⎿  Response:
       Perfect! I've successfully read all the requested files. Let me provide you with a comprehensive report of the current state of error handling, exception classes, DTOs, and database schema.

       COMPREHENSIVE ANALYSIS: Error Handling, Exceptions, DTOs, and Database Schema

       ---
       1. SECURITY-SERVICE EXCEPTIONS AND HANDLERS

       GlobalExceptionHandler

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\GlobalExceptionHandler.java

       Handles 5 exception types:
       - UsernameAlreadyExistsException → HTTP 409 CONFLICT
       - EmailAlreadyExistsException → HTTP 409 CONFLICT
       - UserNotFoundException → HTTP 404 NOT_FOUND
       - RoleNotFoundException → HTTP 404 NOT_FOUND
       - MethodArgumentNotValidException → HTTP 400 BAD_REQUEST (returns error map with field names and messages)
       - Generic Exception → HTTP 500 INTERNAL_SERVER_ERROR

       All exceptions are logged with appropriate levels (warn for business logic, error for unexpected).

       Custom Exception Classes:

       UsernameAlreadyExistsException
       - Extends RuntimeException
       - Annotated with @ResponseStatus(HttpStatus.CONFLICT)
       - Takes message parameter in constructor

       EmailAlreadyExistsException
       - Extends RuntimeException
       - Annotated with @ResponseStatus(HttpStatus.CONFLICT)
       - Takes message parameter in constructor

       UserNotFoundException
       - Extends RuntimeException
       - Annotated with @ResponseStatus(HttpStatus.NOT_FOUND)
       - Takes message parameter in constructor

       RoleNotFoundException
       - Extends RuntimeException
       - Annotated with @ResponseStatus(HttpStatus.NOT_FOUND)
       - Takes message parameter in constructor

       ---
       2. MANAGEMENT-SERVICE EXCEPTIONS AND HANDLERS

       GlobalExceptionHandler

       File: D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\exception\GlobalExceptionHandler.java

       Handles 2 exception types:
       - DataIntegrityViolationException → HTTP 409 CONFLICT (from Spring)
       - DuplicateEmailException → HTTP 409 CONFLICT (custom)

       Note: This handler is less comprehensive than security-service and lacks logging and validation error handling.

       Custom Exception Classes:

       DuplicateEmailException
       - Extends RuntimeException
       - Takes message parameter in constructor
       - No @ResponseStatus annotation (relies on GlobalExceptionHandler)

       ---
       3. SECURITY-SERVICE DTOs

       AuthenticationResponse

       - token: String
       - @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor

       AuthResponse (Enhanced version)

       - token: String
       - username: String
       - email: String
       - id: Long
       - @Data, @NoArgsConstructor, @AllArgsConstructor

       AuthenticationRequest

       - username: String
       - password: String
       - @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor

       RegisterRequest

       - username: String
       - email: String
       - password: String
       - @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor

       UserRegistrationRequest (With validation)

       - username: String
         - @NotBlank (message: "Username cannot be empty")
         - @Size(min=3, max=50, message: "Username must be between 3 and 50 characters")

       - email: String
         - @NotBlank (message: "Email cannot be empty")
         - @Email (message: "Invalid email format")
         - @Size(max=100, message: "Email cannot exceed 100 characters")

       - password: String
         - @NotBlank (message: "Password cannot be empty")
         - @Size(min=6, message: "Password must be at least 6 characters long")

       UserLoginRequest (With validation)

       - username: String
         - @NotBlank (message: "Username cannot be empty")

       - password: String
         - @NotBlank (message: "Password cannot be empty")

       No DTOs found in management-service.

       ---
       4. DATABASE SCHEMA (Flyway Migrations)

       V1 - Initial Security Tables

       USERS Table:
         - ID: NUMBER (auto-increment primary key)
         - USERNAME: VARCHAR2(50) UNIQUE NOT NULL
         - PASSWORD: VARCHAR2(255) NOT NULL
         - EMAIL: VARCHAR2(100) UNIQUE NOT NULL
         - CREATED_AT: TIMESTAMP (default CURRENT_TIMESTAMP)
         - UPDATED_AT: TIMESTAMP (default CURRENT_TIMESTAMP)

       ROLES Table:
         - ID: NUMBER (auto-increment primary key)
         - NAME: VARCHAR2(50) UNIQUE NOT NULL

       USER_ROLES Table (Many-to-Many):
         - USER_ID: NUMBER (FK to USERS)
         - ROLE_ID: NUMBER (FK to ROLES)
         - Primary Key: (USER_ID, ROLE_ID)

       V2 - Initial Roles

       INSERT INTO ROLES: 'ADMIN', 'USER', 'MANAGER'

       V3 - Security User Permissions

       Grant SELECT, INSERT, UPDATE, DELETE on USERS, ROLES, USER_ROLES to security_user

       V4 - Management Service Tables

       CUSTOMER Table:
         - ID: NUMBER (auto-increment primary key)
         - FIRST_NAME: VARCHAR2(100 CHAR) NOT NULL
         - LAST_NAME: VARCHAR2(100 CHAR) NOT NULL
         - EMAIL: VARCHAR2(100 CHAR) UNIQUE NOT NULL
         - PHONE_NUMBER: VARCHAR2(30 CHAR)

       PRODUCT Table:
         - ID: NUMBER (auto-increment primary key)
         - NAME: VARCHAR2(100 CHAR) NOT NULL
         - PRICE: NUMBER(10,2) NOT NULL
         - STOCK_QUANTITY: NUMBER DEFAULT 0

       ORDERS Table:
         - ID: NUMBER (auto-increment primary key)
         - CUSTOMER_ID: NUMBER NOT NULL (FK to CUSTOMER)
         - ORDER_DATE: TIMESTAMP (default CURRENT_TIMESTAMP)
         - STATUS: VARCHAR2(50 CHAR)

       ORDER_ITEM Table:
         - ID: NUMBER (auto-increment primary key)
         - ORDER_ID: NUMBER NOT NULL (FK to ORDERS)
         - PRODUCT_ID: NUMBER NOT NULL (FK to PRODUCT)
         - QUANTITY: NUMBER NOT NULL
         - PRICE: NUMBER(10,2) NOT NULL

       V5 - Initial Customer Data

       Mario Rossi (mario.rossi@example.com, +39-3456789012)
       Giulia Bianchi (giulia.bianchi@example.com, +39-3471234567)

       V6 - Initial Product Data

       Laptop: 899.99, stock 10
       Smartphone: 499.90, stock 25
       Mouse: 25.50, stock 100

       V7 - Order Status Enum

       ALTER TABLE ORDERS ADD CONSTRAINT CHK_ORDER_STATUS
       CHECK (STATUS IN ('PENDING', 'SHIPPED', 'CANCELLED'))

       V8 - Management User Permissions

       Grant SELECT, INSERT, UPDATE, DELETE on CUSTOMER, PRODUCT, ORDERS, ORDER_ITEM to MANAGEMENT_USER

       V9 - Schema Alignment with Entities

       PRODUCT:
         - ADD DESCRIPTION: VARCHAR2(255 CHAR)
         - RENAME STOCK_QUANTITY to STOCK

       ORDERS:
         - ADD TOTAL_AMOUNT: NUMBER(10,2)

       ORDER_ITEM:
         - RENAME PRICE to UNIT_PRICE

       V10 - Create Sequences

       CUSTOMERS_SEQ (START WITH 1, INCREMENT BY 1)
       PRODUCTS_SEQ (START WITH 1, INCREMENT BY 1)
       ORDERS_SEQ (START WITH 1, INCREMENT BY 1)
       ORDER_ITEMS_SEQ (START WITH 1, INCREMENT BY 1)

       V11 - Management User Privileges

       Grant SELECT, INSERT, UPDATE, DELETE on:
         - GESTIONALE_OWNER.CUSTOMER
         - GESTIONALE_OWNER.PRODUCT
         - GESTIONALE_OWNER.ORDERS
         - GESTIONALE_OWNER.ORDER_ITEM

       Grant SELECT on sequences:
         - GESTIONALE_OWNER.CUSTOMERS_SEQ
         - GESTIONALE_OWNER.PRODUCTS_SEQ
         - GESTIONALE_OWNER.ORDERS_SEQ
         - GESTIONALE_OWNER.ORDER_ITEMS_SEQ

       V12 - Account Lockout Columns

       ALTER TABLE USERS ADD:
         - ENABLED: NUMBER(1) DEFAULT 1 NOT NULL
         - ACCOUNT_NON_LOCKED: NUMBER(1) DEFAULT 1 NOT NULL
         - FAILED_LOGIN_ATTEMPTS: NUMBER DEFAULT 0 NOT NULL
         - LOCKED_UNTIL: TIMESTAMP

       ---
       SUMMARY OF KEY FINDINGS

       Exception Handling:
       - Security-service has comprehensive error handling with 5 custom exceptions and proper logging
       - Management-service has minimal error handling (2 exceptions, no logging)
       - Inconsistency in exception design patterns between services

       DTOs:
       - Security-service has 6 DTOs with proper validation annotations
       - Management-service has no DTOs defined
       - Two response variants (AuthenticationResponse and AuthResponse) suggest potential consolidation opportunity

       Database Schema:
       - Uses Oracle 12c+ with auto-increment IDENTITY columns
       - Proper foreign key constraints and unique constraints
       - Account lockout functionality implemented in V12
       - Status enum implemented via CHECK constraint (Oracle limitation)
       - Multi-tenant capable with owner schema separation
  ⎿  Done (32 tool uses · 25.0k tokens · 2m 12s)

● Explore(Explore gateway and JWT details)
  ⎿  Prompt:
       In D:\Progetti\Git\Gestionale, I need to understand the exact current state of the API Gateway and JWT implementation. Read these files completely:

       1. api-gateway/src/main/java - ALL Java files (filters, configs, application class)
       2. api-gateway/src/main/resources/application.yml
       3. api-gateway pom.xml (dependencies)
       4. security-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       5. management-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       6. batch-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       7. All pom.xml files to check Spring Boot and dependency versions

       I need exact code to understand how JWT is currently handled in each service, and what the gateway currently does/doesn't do. Report ALL file contents verbatim.
  ⎿  ❯ In D:\Progetti\Git\Gestionale, I need to understand the exact current state of the API Gateway and JWT implementation. Read these files completely:

       1. api-gateway/src/main/java - ALL Java files (filters, configs, application class)
       2. api-gateway/src/main/resources/application.yml
       3. api-gateway pom.xml (dependencies)
       4. security-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       5. management-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       6. batch-service JwtService.java, JwtAuthFilter.java, JwtProperties.java - FULL content
       7. All pom.xml files to check Spring Boot and dependency versions

       I need exact code to understand how JWT is currently handled in each service, and what the gateway currently does/doesn't do. Report ALL file contents verbatim.
  ⎿  Bash(find "D:\Progetti\Git\Gestionale" -type f -name "pom.xml" | head -20)
     Waiting…
  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale\api-gateway\src\main\java" -type f -name "*.java")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\ApiGatewayApplication.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\config\CorsConfig.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\filter\LoggingGlobalFilter.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\resources\application.yml)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\api-gateway\pom.xml)

  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale\security-service\src\main\java" -type f -name "*.java" | grep -i "jwt\|service")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\JwtService.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtAuthFilter.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtProperties.java)

  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale\management-service\src\main\java" -type f -name "JwtService.java" -o -name "JwtAuthFilter.java" -o -name "JwtProperties.java")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtService.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtAuthFilter.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtProperties.java)

  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale\batch-service\src\main\java" -type f -name "JwtService.java" -o -name "JwtAuthFilter.java" -o -name "JwtProperties.java")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtService.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtAuthFilter.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtProperties.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\pom.xml)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\pom.xml)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\pom.xml)

  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale" -name "application.yml" -o -name "application.yaml")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\resources\application.yml)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\resources\application.yml)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\src\main\resources\application.yml)

  ⎿  

  ⎿  Bash(find "D:\Progetti\Git\Gestionale" -name "SecurityConfig.java")
     Waiting…
  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\SecurityConfig.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\SecurityConfig.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\SecurityConfig.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\ApplicationConfig.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\UserDetailsServiceImpl.java)

  ⎿  

  ⎿  Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\AuthService.java)

  ⎿  

  ⎿  Response:
       Perfect! Now let me create a comprehensive summary report of the JWT implementation state:

       COMPREHENSIVE JWT IMPLEMENTATION STATUS REPORT

       EXECUTIVE SUMMARY

       Your system has 3 different JWT implementations across multiple services with critical inconsistencies:

       1. Security-Service - Full JWT generation + complex validation
       2. Management-Service - JWT validation only (no generation)
       3. Batch-Service - JWT validation only (no generation)
       4. API Gateway - Has JWT dependencies but NO JWT filter or validation implemented

       ---
       1. API GATEWAY (Port 8080)

       File: D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\ApiGatewayApplication.java
       package com.PierLorrai.Gestionale.api_gateway;

       import org.springframework.boot.SpringApplication;
       import org.springframework.boot.autoconfigure.SpringBootApplication;
       import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

       @SpringBootApplication
       @EnableDiscoveryClient // Per registrarsi con Eureka e scoprire altri servizi
       public class ApiGatewayApplication {

        public static void main(String[] args) {
                SpringApplication.run(ApiGatewayApplication.class, args);
        }
       }

       File: D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\config\CorsConfig.java
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

       File: D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\filter\LoggingGlobalFilter.java
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

       File: D:\Progetti\Git\Gestionale\api-gateway\src\main\resources\application.yml
       server:
         port: 8080 # L'API Gateway ascolterà su questa porta. Attenzione: Il security-service non potrà più usare la 8080.

       spring:
         application:
           name: api-gateway # Nome del servizio per la registrazione su Eureka
         cloud:
           gateway:
             discovery:
               locator:
                 enabled: true # Abilita il discovery locator per l'instradamento automatico basato sul nome del servizio Eureka
                 lower-case-service-id: true # Converti l'ID del servizio Eureka in minuscolo
             routes: # Definizione delle rotte esplicite
               - id: security-service-route
                 # Il security-service, dovendo coesistere con il gateway, dovrà essere spostato su un'altra porta (e.g., 8081).
                 # Il gateway instraderà le richieste ad esso tramite il load balancer di Eureka.
                 uri: lb://security-service
                 predicates:
                   - Path=/api/auth/** # Tutte le richieste che iniziano con /api/auth
                 filters:
                   - StripPrefix=1 # Rimuove /api/ dalla URL prima di inoltrarla al servizio (es. /api/auth/login diventa /auth/login)

               - id: management-service-route
                 uri: lb://management-service # lb:// indica che useremo Eureka Load Balancer
                 predicates:
                   - Path=/api/management/** # Tutte le richieste che iniziano con /api/management
                 filters:
                   - StripPrefix=1 # Rimuove /api/ dalla URL prima di inoltrarla al servizio (es. /api/management/products diventa /management/products)

               - id: batch-service-route
                 uri: lb://batch-service # lb:// indica che useremo Eureka Load Balancer
                 predicates:
                   - Path=/api/batch/** # Tutte le richieste che iniziano con /api/batch
                 filters:
                   - StripPrefix=1 # Rimuove /api/ dalla URL prima di inoltrarla al servizio


         autoconfigure:
           exclude:
             - org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration
       eureka:
         client:
           serviceUrl:
             defaultZone: http://gestionale-eureka-server:8761/eureka/ # Indirizzo dell'Eureka Server
         instance:
           preferIpAddress: true # Registra l'IP del gateway invece dell'hostname con Eureka

       # === Logging Configuration for Debugging ===
       logging:
         level:
           root: INFO
           org.springframework.cloud.gateway: DEBUG # Dettagli sull'instradamento e i filtri del gateway
           com.netflix.eureka: DEBUG # Dettagli sul client Eureka nel gateway
           org.springframework.cloud.netflix.eureka: DEBUG


       management:
         metrics:
           enable:
             system:
               cpu: false
             process:
               cpu: false
               files: false
               memory: false
               uptime: false
         defaults:
           enabled: false

       File: D:\Progetti\Git\Gestionale\api-gateway\pom.xml
       <?xml version="1.0" encoding="UTF-8"?>
       <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>3.2.7</version> <relativePath/> </parent>
        <groupId>com.PierLorrai.Gestionale</groupId>
        <artifactId>api-gateway</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>api-gateway</name>
        <description>api gateway del gestionale</description>
        <url/>
        <licenses>
                <license/>
        </licenses>
        <developers>
                <developer/>
        </developers>
        <scm>
                <connection/>
                <developerConnection/>
                <tag/>
                <url/>
        </scm>
        <properties>
                <java.version>17</java.version>
                <spring-cloud.version>2023.0.2</spring-cloud.version>
        </properties>
        <dependencies>
                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-starter-gateway</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                </dependency>

                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-api</artifactId>
                        <version>0.11.5</version>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-impl</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-jackson</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-webflux</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-actuator</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-devtools</artifactId>
                        <scope>runtime</scope>
                        <optional>true</optional>
                </dependency>

                <dependency>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <optional>true</optional>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-test</artifactId>
                        <scope>test</scope>
                </dependency>

        </dependencies>
        <dependencyManagement>
                <dependencies>
                        <dependency>
                                <groupId>org.springframework.cloud</groupId>
                                <artifactId>spring-cloud-dependencies</artifactId>
                                <version>${spring-cloud.version}</version>
                                <type>pom</type>
                                <scope>import</scope>
                        </dependency>
                </dependencies>
        </dependencyManagement>

        <build>
                <plugins>
                        <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <configuration>
                                        <excludes>
                                                <exclude>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </exclude>
                                        </excludes>
                                </configuration>
                        </plugin>
                </plugins>
        </build>

       </project>

       ---
       2. SECURITY-SERVICE (Port 8081)

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\JwtService.java
       // D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/JwtService.java
       package com.PierLorrai.Gestionale.service; // AGGIORNATO

       import com.PierLorrai.Gestionale.config.JwtProperties;
       import io.jsonwebtoken.Claims;
       import io.jsonwebtoken.Jwts;
       import io.jsonwebtoken.SignatureAlgorithm;
       import io.jsonwebtoken.io.Decoders;
       import io.jsonwebtoken.security.Keys;
       import lombok.RequiredArgsConstructor;
       import org.slf4j.Logger;
       import org.slf4j.LoggerFactory;
       import org.springframework.security.core.userdetails.UserDetails;
       import org.springframework.stereotype.Service;

       import java.security.Key;
       import java.util.Date;
       import java.util.HashMap;
       import java.util.Map;
       import java.util.function.Function;

       @Service
       @RequiredArgsConstructor
       public class JwtService {

           private static final Logger log = LoggerFactory.getLogger(JwtService.class);
           private final JwtProperties jwtProperties;

           public String extractUsername(String token) {
               return extractClaim(token, Claims::getSubject);
           }

           public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
               final Claims claims = extractAllClaims(token);
               return claimsResolver.apply(claims);
           }

           public String generateToken(UserDetails userDetails) {
               return generateToken(new HashMap<>(), userDetails);
           }

           public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
               long expiration = jwtProperties.getExpiration();
               Date now = new Date(System.currentTimeMillis());
               Date expiryDate = new Date(now.getTime() + expiration);

               log.debug("Generating token for user: {}", userDetails.getUsername());

               return Jwts.builder()
                       .setClaims(extraClaims)
                       .setSubject(userDetails.getUsername())
                       .setIssuedAt(now)
                       .setExpiration(expiryDate)
                       .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                       .compact();
           }

           public boolean isTokenValid(String token, UserDetails userDetails) {
               final String username = extractUsername(token);
               return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
           }

           private boolean isTokenExpired(String token) {
               return extractExpiration(token).before(new Date());
           }

           private Date extractExpiration(String token) {
               return extractClaim(token, Claims::getExpiration);
           }

           private Claims extractAllClaims(String token) {
               return Jwts
                       .parserBuilder()
                       .setSigningKey(getSignInKey())
                       .build()
                       .parseClaimsJws(token)
                       .getBody();
           }

           private Key getSignInKey() {
               byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
               return Keys.hmacShaKeyFor(keyBytes);
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtAuthFilter.java
       package com.PierLorrai.Gestionale.config;

       import com.PierLorrai.Gestionale.service.JwtService;
       import jakarta.servlet.FilterChain;
       import jakarta.servlet.ServletException;
       import jakarta.servlet.http.HttpServletRequest;
       import jakarta.servlet.http.HttpServletResponse;
       import lombok.RequiredArgsConstructor;
       import org.slf4j.Logger;
       import org.slf4j.LoggerFactory;
       import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
       import org.springframework.security.core.context.SecurityContextHolder;
       import org.springframework.security.core.userdetails.UserDetails;
       import org.springframework.security.core.userdetails.UserDetailsService;
       import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
       import org.springframework.stereotype.Component;
       import org.springframework.web.filter.OncePerRequestFilter;

       import java.io.IOException;

       @Component
       @RequiredArgsConstructor
       public class JwtAuthFilter extends OncePerRequestFilter {

           private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

           private final JwtService jwtService;
           private final UserDetailsService userDetailsService;

           @Override
           protected void doFilterInternal(HttpServletRequest request,
                                           HttpServletResponse response,
                                           FilterChain filterChain)
                   throws ServletException, IOException {

               final String authHeader = request.getHeader("Authorization");
               final String jwt;
               final String username;

               if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                   filterChain.doFilter(request, response);
                   return;
               }

               jwt = authHeader.substring(7);
               try {
                   username = jwtService.extractUsername(jwt);
                   log.debug("Extracted username from JWT: {}", username);
               } catch (Exception e) {
                   log.error("Error extracting username from JWT: {}", e.getMessage());
                   filterChain.doFilter(request, response);
                   return;
               }

               if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                   UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                   if (jwtService.isTokenValid(jwt, userDetails)) {
                       UsernamePasswordAuthenticationToken authToken =
                               new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                       authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       SecurityContextHolder.getContext().setAuthentication(authToken);
                       log.debug("User {} authenticated successfully via JWT.", username);
                   } else {
                       log.warn("Invalid JWT token for user: {}", username);
                   }
               }

               filterChain.doFilter(request, response);
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtProperties.java
       package com.PierLorrai.Gestionale.config;

       import lombok.Getter;
       import lombok.Setter;
       import org.springframework.boot.context.properties.ConfigurationProperties;
       import org.springframework.stereotype.Component;

       @Getter
       @Setter
       @Component
       @ConfigurationProperties(prefix = "application.security.jwt")
       public class JwtProperties {
           private String secretKey;
           private long expiration; // o expirationMinutes se vuoi, ma adatta il nome nel YAML
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\SecurityConfig.java
       package com.PierLorrai.Gestionale.config;

       import lombok.RequiredArgsConstructor;
       import lombok.extern.slf4j.Slf4j;
       import org.springframework.context.annotation.Bean;
       import org.springframework.context.annotation.Configuration;
       import org.springframework.security.authentication.AuthenticationManager;
       import org.springframework.security.authentication.AuthenticationProvider;
       import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
       import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
       import org.springframework.security.config.annotation.web.builders.HttpSecurity;
       import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
       import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
       import org.springframework.security.config.http.SessionCreationPolicy;
       import org.springframework.security.web.SecurityFilterChain;
       import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

       @Slf4j
       @Configuration
       @EnableWebSecurity
       @EnableMethodSecurity
       @RequiredArgsConstructor
       public class SecurityConfig {

           private final JwtAuthFilter jwtAuthFilter;
           private final AuthenticationProvider authenticationProvider;

           @Bean
           public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
               log.info(">>>> Configurazione SecurityFilterChain caricata");

               http
                       .csrf(AbstractHttpConfigurer::disable)
                       .authorizeHttpRequests(authz -> {
                           log.info(">>>> Definizione dei permessi sulle rotte");
                           authz
                                   .requestMatchers("/api/auth/register", "/api/auth/authenticate").permitAll()
                                   .anyRequest().authenticated();
                       })
                       .sessionManagement(session -> {
                           log.info(">>>> Configurazione sessione stateless");
                           session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                       })
                       .authenticationProvider(authenticationProvider)
                       .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

               log.info(">>>> SecurityFilterChain costruita correttamente");
               return http.build();
           }

           @Bean
           public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
               log.info(">>>> AuthenticationManager richiesto");
               return config.getAuthenticationManager();
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\ApplicationConfig.java
       package com.PierLorrai.Gestionale.config;

       import com.PierLorrai.Gestionale.repository.UserRepository;
       import lombok.RequiredArgsConstructor;
       import org.springframework.context.annotation.Bean;
       import org.springframework.context.annotation.Configuration;
       import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
       import org.springframework.security.core.userdetails.UserDetailsService;
       import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
       import org.springframework.security.crypto.password.PasswordEncoder;

       @Configuration
       @RequiredArgsConstructor
       public class ApplicationConfig {

           private final UserRepository userRepository;

           @Bean
           public PasswordEncoder passwordEncoder() {
               return new BCryptPasswordEncoder();
           }

           @Bean
           public DaoAuthenticationProvider daoAuthProvider(UserDetailsService uds,
                                                            PasswordEncoder encoder) {
               DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
               provider.setUserDetailsService(uds);
               provider.setPasswordEncoder(encoder);
               return provider;
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\UserDetailsServiceImpl.java
       // D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/UserDetailsServiceImpl.java
       package com.PierLorrai.Gestionale.service; // AGGIORNATO

       import com.PierLorrai.Gestionale.model.User;
       import com.PierLorrai.Gestionale.repository.UserRepository;
       import lombok.RequiredArgsConstructor;
       import org.slf4j.Logger;
       import org.slf4j.LoggerFactory;
       import org.springframework.security.core.userdetails.UserDetails;
       import org.springframework.security.core.userdetails.UserDetailsService;
       import org.springframework.security.core.userdetails.UsernameNotFoundException;
       import org.springframework.stereotype.Service;


       @Service
       @RequiredArgsConstructor
       public class UserDetailsServiceImpl implements UserDetailsService {

           private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

           private final UserRepository userRepository;

           @Override
           public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
               log.debug("Loading user by username: {}", username);
               // Poiché la tua classe User ora implementa UserDetails, puoi restituirla direttamente
               User user = userRepository.findByUsername(username)
                       .orElseThrow(() -> {
                           log.warn("User not found: {}", username);
                           return new UsernameNotFoundException("User not found with username: " + username);
                       });
               return user; // Restituisce direttamente la tua entità User che è anche un UserDetails
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\AuthService.java (partial - key methods)
       // D:/Progetti/Git/Gestionale/security-service/src/main/java/com/PierLorrai/Gestionale/service/AuthService.java
       package com.PierLorrai.Gestionale.service; // AGGIORNATO

       import com.PierLorrai.Gestionale.dto.AuthResponse; // AGGIORNATO
       import com.PierLorrai.Gestionale.dto.UserLoginRequest; // AGGIORNATO
       import com.PierLorrai.Gestionale.dto.UserRegistrationRequest; // AGGIORNATO
       // ... [imports omitted for brevity]

       @Service
       @RequiredArgsConstructor
       public class AuthService {

           private static final Logger log = LoggerFactory.getLogger(AuthService.class);

           private final UserRepository userRepository;
           private final RoleRepository roleRepository;
           private final PasswordEncoder passwordEncoder;
           private final JwtService jwtService;
           private final AuthenticationManager authenticationManager;

           @Transactional
           public AuthResponse register(UserRegistrationRequest request) {
               log.info("Attempting to register user: {}", request.getUsername());

               if (userRepository.findByUsername(request.getUsername()).isPresent()) {
                   log.warn("Registration failed: Username {} already taken.", request.getUsername());
                   throw new UsernameAlreadyExistsException("Username " + request.getUsername() + " already taken.");
               }
               if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                   log.warn("Registration failed: Email {} already registered.", request.getEmail());
                   throw new EmailAlreadyExistsException("Email " + request.getEmail() + " already registered.");
               }

               Role userRole = roleRepository.findByName("USER")
                       .orElseThrow(() -> {
                           log.error("Role 'USER' not found in database.");
                           return new RoleNotFoundException("Role 'USER' not found. Please ensure it's created.");
                       });

               User user = User.builder()
                       .username(request.getUsername())
                       .email(request.getEmail())
                       .password(passwordEncoder.encode(request.getPassword()))
                       .build();
               user.getRoles().add(userRole);

               User savedUser = userRepository.save(user);
               log.info("User {} registered successfully with ID: {}", savedUser.getUsername(), savedUser.getId());

               var jwtToken = jwtService.generateToken(savedUser);
               return new AuthResponse(jwtToken, savedUser.getUsername(), savedUser.getEmail(), savedUser.getId());
           }

           @Transactional
           public AuthResponse authenticate(UserLoginRequest request) {
               log.info("Attempting to authenticate user: {}", request.getUsername());

               User user = userRepository.findByUsername(request.getUsername())
                       .orElseThrow(() -> {
                           log.warn("User {} not found.", request.getUsername());
                           return new UsernameNotFoundException("Invalid credentials for user: " + request.getUsername());
                       });

               // Check if the account is locked
               if (!user.isAccountNonLocked()) {
                   if (user.getLockedUntil() != null && user.getLockedUntil().isBefore(LocalDateTime.now())) {
                       // Lock period expired, unlock the account
                       user.setAccountNonLocked(true);
                       user.setFailedLoginAttempts(0);
                       user.setLockedUntil(null);
                       userRepository.save(user);
                   } else {
                       log.warn("Account locked for user: {}", request.getUsername());
                       throw new UsernameNotFoundException("Account is locked. Try again later.");
                   }
               }

               try {
                   authenticationManager.authenticate(
                           new UsernamePasswordAuthenticationToken(
                                   request.getUsername(),
                                   request.getPassword()
                           )
                   );
               } catch (org.springframework.security.core.AuthenticationException e) {
                   log.warn("Authentication failed for user {}: {}", request.getUsername(), e.getMessage());
                   int attempts = user.getFailedLoginAttempts() + 1;
                   user.setFailedLoginAttempts(attempts);
                   if (attempts >= 5) {
                       user.setAccountNonLocked(false);
                       user.setLockedUntil(LocalDateTime.now().plusMinutes(30));
                       log.warn("Account locked for user {} after {} failed attempts.", request.getUsername(), attempts);
                   }
                   userRepository.save(user);
                   throw new UsernameNotFoundException("Invalid credentials for user: " + request.getUsername());
               }

               // Successful authentication: reset failed attempts
               if (user.getFailedLoginAttempts() > 0) {
                   user.setFailedLoginAttempts(0);
                   userRepository.save(user);
               }

               var jwtToken = jwtService.generateToken(user);
               log.info("User {} authenticated successfully.", request.getUsername());
               return new AuthResponse(jwtToken, user.getUsername(), user.getEmail(), user.getId());
           }

           @Transactional
           public User assignRoleToUser(Long userId, String roleName) {
               log.info("Assigning role {} to user with ID: {}", roleName, userId);
               User user = userRepository.findById(userId)
                       .orElseThrow(() -> {
                           log.warn("User with ID {} not found for role assignment.", userId);
                           return new UserNotFoundException("User with ID " + userId + " not found.");
                       });

               Role role = roleRepository.findByName(roleName)
                       .orElseThrow(() -> {
                           log.warn("Role {} not found for assignment to user {}.", roleName, userId);
                           return new RoleNotFoundException("Role " + roleName + " not found.");
                       });

               user.getRoles().add(role);
               User updatedUser = userRepository.save(user);
               log.info("Role {} assigned to user {}.", roleName, user.getUsername());
               return updatedUser;
           }
       }

       File: D:\Progetti\Git\Gestionale\security-service\src\main\resources\application.yml
       # src/main/resources/application.yml

       # === Spring Application Settings ===
       spring:
           application:
               name: security-service # Nome del servizio per la registrazione su Eureka

           # === Database Connection Configuration for Application (JPA/Hibernate) ===
           datasource:
               # url: jdbc:oracle:thin:@localhost:1521/FREEPDB1  <--- originale
               # spring.datasource.url=jdbc:oracle:thin:@oracle-db:1521:XE
               url: jdbc:oracle:thin:@oracle-db:1521/FREEPDB1 # OK: Utilizza il nome del servizio Docker
               username: security_user                     # Questo utente gestirà le operazioni CRUD dell'applicazione
               password: ${SPRING_DATASOURCE_PASSWORD:changeme}
               driver-class-name: oracle.jdbc.OracleDriver
               hikari:
                   schema: GESTIONALE_OWNER                  # Lo schema predefinito per le tabelle gestite da JPA

           # === JPA (Hibernate) Configuration ===
           jpa:
               properties:
                   hibernate:
                       dialect: org.hibernate.dialect.OracleDialect
                       format_sql: true
                       default_schema: GESTIONALE_OWNER        # Lo schema predefinito per Hibernate
               show-sql: true # Mostra le query SQL generate da Hibernate nel log

           # === Flyway Database Migration Configuration ===
           flyway:
               enabled: true # Lascia a true per abilitare Flyway e le migrazioni all'avvio
               baseline-on-migrate: false # Crea la tabella di history di Flyway se non esiste e la allinea
               locations: classpath:db/migration # Percorso delle tue script di migrazione SQL
               url: jdbc:oracle:thin:@oracle-db:1521/FREEPDB1 # OK: Connessione di Flyway allo stesso PDB (utilizza il nome del servizio Docker)
               user: GESTIONALE_OWNER                  # Utente con privilegi DDL per le migrazioni
               password: ${FLYWAY_PASSWORD:changeme}                   # Password verificata con successo
               schemas: GESTIONALE_OWNER                   # Lo schema in cui Flyway gestirà le tabelle (incluso flyway_schema_history)

           autoconfigure:
               exclude:
                   - org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration


       # === Embedded Web Server (Tomcat) Configuration ===
       server:
           port: 8081 # Porta su cui l'applicazione Spring Boot sarà accessibile

       # === Eureka Client Configuration ===
       eureka:
           client:
               serviceUrl:
                   # PUNTAMENTO AL NOME DEL SERVIZIO EUREKA NEL NETWORK DOCKER
                   defaultZone: http://gestionale-eureka-server:8761/eureka/
           instance:
               # Importante: registra il servizio su Eureka con il suo NOME del servizio Docker
               # Questo permette ad altri servizi nello stesso network Docker di trovarlo
               hostname: gestionale-security-service # Utilizza il nome del container Docker per questo servizio
                 # preferIpAddress: true # Considera di decommentare se hai problemi di risoluzione DNS tra i container
                 # o se preferisci che Eureka registri l'IP del container anziché il suo hostname Docker.
               # Generalmente, hostname funziona meglio con i nomi dei servizi nel network Docker.

       # === JWT (JSON Web Token) Configuration (example, adjust as needed) ===
       application:
           security:
               jwt:
                   secret-key: ${JWT_SECRET_KEY:changeme}
                   expiration: 3600000 # 1 ora in millisecondi

       # === Logging Configuration for Debugging ===
       logging:
           level:
               root: INFO
               org.springframework.jdbc: DEBUG # Dettagli sulle operazioni JDBC di Spring
               org.flywaydb: DEBUG # Dettagli sul processo di migrazione di Flyway
               com.zaxxer.hikari: DEBUG # Dettagli sul pool di connessioni HikariCP
               org.hibernate.orm.jdbc.connections.internal: DEBUG # Dettagli sulle connessioni interne di Hibernate
               com.PierLorrai.Gestionale: DEBUG # Per vedere i log della tua applicazione
               org.springframework.security: DEBUG
               org.springframework.web: DEBUG
               # Aggiungi livelli di logging per Eureka Client se vuoi vedere più dettagli sulla registrazione
               com.netflix.eureka: DEBUG
               org.springframework.cloud.netflix.eureka: DEBUG

       management:
           metrics:
               enable:
                   system:
                       cpu: false
                   process:
                       cpu: false
                       files: false
                       memory: false
                       uptime: false
           defaults:
               enabled: false

       File: D:\Progetti\Git\Gestionale\security-service\pom.xml
       <?xml version="1.0" encoding="UTF-8"?>
       <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>3.3.1</version> <!-- Versione di Spring Boot -->
                <relativePath/> <!-- lookup parent from repository -->
        </parent>

        <groupId>com.PierLorrai.Gestionale</groupId>
        <artifactId>security-service</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>security-service</name>
        <description>Security Service for Microservices Demo</description>

        <properties>
                <java.version>17</java.version>
                <!-- Definisci qui la versione di Spring Cloud compatibile con Spring Boot 3.3.1 -->
                <!-- Per Spring Boot 3.3.x, la versione di Spring Cloud è tipicamente 2023.0.x (es. 2023.0.2) -->
                <spring-cloud.version>2023.0.2</spring-cloud.version>
        </properties>

        <dependencies>
                <!-- Spring Boot Starters -->
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-data-jpa</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-validation</artifactId>
                </dependency>

                <!-- Dipendenza per Eureka Client (Discovery Client) -->
                <!-- La versione è gestita dalla sezione <dependencyManagement> -->
                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                </dependency>

                <!-- Driver JDBC Oracle -->
                <dependency>
                        <groupId>com.oracle.database.jdbc</groupId>
                        <artifactId>ojdbc11</artifactId>
                        <scope>runtime</scope>
                </dependency>

                <!-- Dipendenze Flyway per le migrazioni del database -->
                <dependency>
                        <groupId>org.flywaydb</groupId>
                        <artifactId>flyway-core</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.flywaydb</groupId>
                        <artifactId>flyway-database-oracle</artifactId>
                </dependency>

                <!-- Dipendenze JWT (JSON Web Token) -->
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-api</artifactId>
                        <version>0.11.5</version>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-impl</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-jackson</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>

                <!-- Lombok (per ridurre boilerplate code) -->
                <dependency>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <optional>true</optional>
                </dependency>

                <!-- Dipendenze per i test -->
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-test</artifactId>
                        <scope>test</scope>
                </dependency>
                <dependency>
                        <groupId>org.springframework.security</groupId>
                        <artifactId>spring-security-test</artifactId>
                        <scope>test</scope>
                </dependency>
        </dependencies>

        <!-- Sezione per la gestione delle dipendenze di Spring Cloud -->
        <!-- Questo assicura che tutte le dipendenze di Spring Cloud utilizzino la versione definita in <spring-cloud.version> -->
        <dependencyManagement>
                <dependencies>
                        <dependency>
                                <groupId>org.springframework.cloud</groupId>
                                <artifactId>spring-cloud-dependencies</artifactId>
                                <version>${spring-cloud.version}</version>
                                <type>pom</type>
                                <scope>import</scope>
                        </dependency>
                </dependencies>
        </dependencyManagement>

        <build>
                <plugins>
                        <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <configuration>
                                        <excludes>
                                                <exclude>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </exclude>
                                        </excludes>
                                </configuration>
                        </plugin>
                </plugins>
        </build>

       </project>

       ---
       3. MANAGEMENT-SERVICE (Port 8082)

       File: D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtService.java
       package com.PierLorrai.Gestionale.management_service.config;

       import io.jsonwebtoken.Claims;
       import io.jsonwebtoken.Jwts;
       import io.jsonwebtoken.io.Decoders;
       import io.jsonwebtoken.security.Keys;
       import lombok.RequiredArgsConstructor;
       import org.springframework.stereotype.Service;

       import java.security.Key;
       import java.util.Date;
       import java.util.function.Function;

       @Service
       @RequiredArgsConstructor
       public class JwtService {

           private final JwtProperties jwtProperties;

           public String extractUsername(String token) {
               return extractClaim(token, Claims::getSubject);
           }

           public boolean isTokenValid(String token) {
               try {
                   extractAllClaims(token);
                   return !isTokenExpired(token);
               } catch (Exception e) {
                   return false;
               }
           }

           public boolean isTokenExpired(String token) {
               return extractExpiration(token).before(new Date());
           }

           private Date extractExpiration(String token) {
               return extractClaim(token, Claims::getExpiration);
           }

           public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
               final Claims claims = extractAllClaims(token);
               return claimsResolver.apply(claims);
           }

           private Claims extractAllClaims(String token) {
               return Jwts
                       .parserBuilder()
                       .setSigningKey(getSignInKey())
                       .build()
                       .parseClaimsJws(token)
                       .getBody();
           }

           private Key getSignInKey() {
               byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
               return Keys.hmacShaKeyFor(keyBytes);
           }
       }

       File: D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtAuthFilter.java
       package com.PierLorrai.Gestionale.management_service.config;

       import jakarta.servlet.FilterChain;
       import jakarta.servlet.ServletException;
       import jakarta.servlet.http.HttpServletRequest;
       import jakarta.servlet.http.HttpServletResponse;
       import lombok.RequiredArgsConstructor;
       import org.slf4j.Logger;
       import org.slf4j.LoggerFactory;
       import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
       import org.springframework.security.core.authority.SimpleGrantedAuthority;
       import org.springframework.security.core.context.SecurityContextHolder;
       import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
       import org.springframework.stereotype.Component;
       import org.springframework.web.filter.OncePerRequestFilter;

       import java.io.IOException;
       import java.util.List;

       @Component
       @RequiredArgsConstructor
       public class JwtAuthFilter extends OncePerRequestFilter {

           private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

           private final JwtService jwtService;

           @Override
           protected void doFilterInternal(HttpServletRequest request,
                                           HttpServletResponse response,
                                           FilterChain filterChain)
                   throws ServletException, IOException {

               final String authHeader = request.getHeader("Authorization");
               final String jwt;
               final String username;

               if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                   filterChain.doFilter(request, response);
                   return;
               }

               jwt = authHeader.substring(7);
               try {
                   username = jwtService.extractUsername(jwt);
                   log.debug("Extracted username from JWT: {}", username);
               } catch (Exception e) {
                   log.error("Error extracting username from JWT: {}", e.getMessage());
                   filterChain.doFilter(request, response);
                   return;
               }

               if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                   if (jwtService.isTokenValid(jwt)) {
                       UsernamePasswordAuthenticationToken authToken =
                               new UsernamePasswordAuthenticationToken(
                                       username,
                                       null,
                                       List.of(new SimpleGrantedAuthority("ROLE_USER"))
                               );
                       authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       SecurityContextHolder.getContext().setAuthentication(authToken);
                       log.debug("User {} authenticated successfully via JWT.", username);
                   } else {
                       log.warn("Invalid JWT token for user: {}", username);
                   }
               }

               filterChain.doFilter(request, response);
           }
       }

       File: D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtProperties.java
       package com.PierLorrai.Gestionale.management_service.config;

       import lombok.Getter;
       import lombok.Setter;
       import org.springframework.boot.context.properties.ConfigurationProperties;
       import org.springframework.stereotype.Component;

       @Getter
       @Setter
       @Component
       @ConfigurationProperties(prefix = "application.security.jwt")
       public class JwtProperties {
           private String secretKey;
       }

       File: D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\SecurityConfig.java
       package com.PierLorrai.Gestionale.management_service.config;

       import lombok.RequiredArgsConstructor;
       import lombok.extern.slf4j.Slf4j;
       import org.springframework.context.annotation.Bean;
       import org.springframework.context.annotation.Configuration;
       import org.springframework.security.config.annotation.web.builders.HttpSecurity;
       import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
       import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
       import org.springframework.security.config.http.SessionCreationPolicy;
       import org.springframework.security.web.SecurityFilterChain;
       import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

       @Slf4j
       @Configuration
       @EnableWebSecurity
       @RequiredArgsConstructor
       public class SecurityConfig {

           private final JwtAuthFilter jwtAuthFilter;

           @Bean
           public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
               log.info(">>>> Management-service SecurityFilterChain caricata");

               http
                       .csrf(AbstractHttpConfigurer::disable)
                       .authorizeHttpRequests(authz -> authz
                               .requestMatchers("/actuator/**").permitAll()
                               .requestMatchers("/api/**").authenticated()
                               .anyRequest().authenticated()
                       )
                       .sessionManagement(session ->
                               session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                       )
                       .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

               return http.build();
           }
       }

       File: D:\Progetti\Git\Gestionale\management-service\src\main\resources\application.yml
       server:
         port: 8082

       spring:
         application:
           name: management-service

         datasource:
           url: jdbc:oracle:thin:@oracle-db:1521/FREEPDB1
           username: MANAGEMENT_USER                    # Utente con accesso in sola lettura/scrittura
           password: ${SPRING_DATASOURCE_PASSWORD:changeme}
           driver-class-name: oracle.jdbc.OracleDriver
           hikari:
             schema: GESTIONALE_OWNER                   # Schema logico del pool

         jpa:
           hibernate:
             ddl-auto: validate                         # Flyway gestisce le migrazioni
           show-sql: true
           properties:
             hibernate:
               dialect: org.hibernate.dialect.OracleDialect
               format_sql: true
               default_schema: GESTIONALE_OWNER         # Schema effettivo delle entità

         autoconfigure:
           exclude:
             - org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration

       eureka:
         client:
           serviceUrl:
             defaultZone: http://gestionale-eureka-server:8761/eureka/
         instance:
           hostname: gestionale-management-service

       logging:
         level:
           root: INFO
           org.springframework.jdbc: DEBUG
           org.flywaydb: DEBUG
           com.zaxxer.hikari: DEBUG
           org.hibernate.orm.jdbc.connections.internal: DEBUG
           com.PierLorrai.Gestionale: DEBUG

       application:
         security:
           jwt:
             secret-key: ${JWT_SECRET_KEY:changeme}

       management:
         metrics:
           enable:
             system:
               cpu: false
             process:
               cpu: false
               files: false
               memory: false
               uptime: false
         defaults:
           enabled: false

       File: D:\Progetti\Git\Gestionale\management-service\pom.xml
       <?xml version="1.0" encoding="UTF-8"?>
       <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>3.5.3</version>
                <relativePath/> <!-- lookup parent from repository -->
        </parent>
        <groupId>com.PierLorrai.Gestionale</groupId>
        <artifactId>management-service</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>management-service</name>
        <description>management service del gestionale</description>
        <url/>
        <licenses>
                <license/>
        </licenses>
        <developers>
                <developer/>
        </developers>
        <scm>
                <connection/>
                <developerConnection/>
                <tag/>
                <url/>
        </scm>
        <properties>
                <java.version>17</java.version>
                <spring-cloud.version>2025.0.0</spring-cloud.version>
        </properties>
        <dependencies>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-data-jpa</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-validation</artifactId>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-api</artifactId>
                        <version>0.11.5</version>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-impl</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-jackson</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-devtools</artifactId>
                        <scope>runtime</scope>
                        <optional>true</optional>
                </dependency>
                <dependency>
                        <groupId>com.oracle.database.jdbc</groupId>
                        <artifactId>ojdbc11</artifactId>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <optional>true</optional>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-test</artifactId>
                        <scope>test</scope>
                </dependency>
        </dependencies>
        <dependencyManagement>
                <dependencies>
                        <dependency>
                                <groupId>org.springframework.cloud</groupId>
                                <artifactId>spring-cloud-dependencies</artifactId>
                                <version>${spring-cloud.version}</version>
                                <type>pom</type>
                                <scope>import</scope>
                        </dependency>
                </dependencies>
        </dependencyManagement>

        <build>
                <plugins>
                        <plugin>
                                <groupId>org.apache.maven.plugins</groupId>
                                <artifactId>maven-compiler-plugin</artifactId>
                                <configuration>
                                        <annotationProcessorPaths>
                                                <path>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </path>
                                        </annotationProcessorPaths>
                                </configuration>
                        </plugin>
                        <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <configuration>
                                        <excludes>
                                                <exclude>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </exclude>
                                        </excludes>
                                </configuration>
                        </plugin>
                </plugins>
        </build>

       </project>

       ---
       4. BATCH-SERVICE (Port 8083)

       File: D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtService.java
       package com.PierLorrai.Gestionale.config;

       import io.jsonwebtoken.Claims;
       import io.jsonwebtoken.Jwts;
       import io.jsonwebtoken.io.Decoders;
       import io.jsonwebtoken.security.Keys;
       import lombok.RequiredArgsConstructor;
       import org.springframework.stereotype.Service;

       import java.security.Key;
       import java.util.Date;
       import java.util.function.Function;

       @Service
       @RequiredArgsConstructor
       public class JwtService {

           private final JwtProperties jwtProperties;

           public String extractUsername(String token) {
               return extractClaim(token, Claims::getSubject);
           }

           public boolean isTokenValid(String token) {
               try {
                   extractAllClaims(token);
                   return !isTokenExpired(token);
               } catch (Exception e) {
                   return false;
               }
           }

           public boolean isTokenExpired(String token) {
               return extractExpiration(token).before(new Date());
           }

           private Date extractExpiration(String token) {
               return extractClaim(token, Claims::getExpiration);
           }

           public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
               final Claims claims = extractAllClaims(token);
               return claimsResolver.apply(claims);
           }

           private Claims extractAllClaims(String token) {
               return Jwts
                       .parserBuilder()
                       .setSigningKey(getSignInKey())
                       .build()
                       .parseClaimsJws(token)
                       .getBody();
           }

           private Key getSignInKey() {
               byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
               return Keys.hmacShaKeyFor(keyBytes);
           }
       }

       File: D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtAuthFilter.java
       package com.PierLorrai.Gestionale.config;

       import jakarta.servlet.FilterChain;
       import jakarta.servlet.ServletException;
       import jakarta.servlet.http.HttpServletRequest;
       import jakarta.servlet.http.HttpServletResponse;
       import lombok.RequiredArgsConstructor;
       import org.slf4j.Logger;
       import org.slf4j.LoggerFactory;
       import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
       import org.springframework.security.core.authority.SimpleGrantedAuthority;
       import org.springframework.security.core.context.SecurityContextHolder;
       import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
       import org.springframework.stereotype.Component;
       import org.springframework.web.filter.OncePerRequestFilter;

       import java.io.IOException;
       import java.util.List;

       @Component
       @RequiredArgsConstructor
       public class JwtAuthFilter extends OncePerRequestFilter {

           private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

           private final JwtService jwtService;

           @Override
           protected void doFilterInternal(HttpServletRequest request,
                                           HttpServletResponse response,
                                           FilterChain filterChain)
                   throws ServletException, IOException {

               final String authHeader = request.getHeader("Authorization");
               final String jwt;
               final String username;

               if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                   filterChain.doFilter(request, response);
                   return;
               }

               jwt = authHeader.substring(7);
               try {
                   username = jwtService.extractUsername(jwt);
                   log.debug("Extracted username from JWT: {}", username);
               } catch (Exception e) {
                   log.error("Error extracting username from JWT: {}", e.getMessage());
                   filterChain.doFilter(request, response);
                   return;
               }

               if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                   if (jwtService.isTokenValid(jwt)) {
                       UsernamePasswordAuthenticationToken authToken =
                               new UsernamePasswordAuthenticationToken(
                                       username,
                                       null,
                                       List.of(new SimpleGrantedAuthority("ROLE_USER"))
                               );
                       authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       SecurityContextHolder.getContext().setAuthentication(authToken);
                       log.debug("User {} authenticated successfully via JWT.", username);
                   } else {
                       log.warn("Invalid JWT token for user: {}", username);
                   }
               }

               filterChain.doFilter(request, response);
           }
       }

       File: D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\JwtProperties.java
       package com.PierLorrai.Gestionale.config;

       import lombok.Getter;
       import lombok.Setter;
       import org.springframework.boot.context.properties.ConfigurationProperties;
       import org.springframework.stereotype.Component;

       @Getter
       @Setter
       @Component
       @ConfigurationProperties(prefix = "application.security.jwt")
       public class JwtProperties {
           private String secretKey;
       }

       File: D:\Progetti\Git\Gestionale\batch-service\src\main\java\com\PierLorrai\Gestionale\config\SecurityConfig.java
       package com.PierLorrai.Gestionale.config;

       import lombok.RequiredArgsConstructor;
       import lombok.extern.slf4j.Slf4j;
       import org.springframework.context.annotation.Bean;
       import org.springframework.context.annotation.Configuration;
       import org.springframework.security.config.annotation.web.builders.HttpSecurity;
       import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
       import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
       import org.springframework.security.config.http.SessionCreationPolicy;
       import org.springframework.security.web.SecurityFilterChain;
       import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

       @Slf4j
       @Configuration
       @EnableWebSecurity
       @RequiredArgsConstructor
       public class SecurityConfig {

           private final JwtAuthFilter jwtAuthFilter;

           @Bean
           public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
               log.info(">>>> Batch-service SecurityFilterChain caricata");

               http
                       .csrf(AbstractHttpConfigurer::disable)
                       .authorizeHttpRequests(authz -> authz
                               .requestMatchers("/actuator/**").permitAll()
                               .requestMatchers("/api/**").authenticated()
                               .anyRequest().authenticated()
                       )
                       .sessionManagement(session ->
                               session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                       )
                       .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

               return http.build();
           }
       }

       File: D:\Progetti\Git\Gestionale\batch-service\src\main\resources\application.yml
       server:
         port: 8083 # Porta specifica per il Batch Service

       spring:
         application:
           name: batch-service
         datasource:
           url: jdbc:oracle:thin:@oracle-db:1521/FREEPDB1 # Connessione al DB Docker
           username: ${SPRING_DATASOURCE_USERNAME:BATCH_USER}
           password: ${SPRING_DATASOURCE_PASSWORD:changeme}
           driver-class-name: oracle.jdbc.OracleDriver
         jpa:
           hibernate:
             ddl-auto: validate
           show-sql: true
           properties:
             hibernate:
               format_sql: true
         batch:
           jdbc:
             initialize-schema: always # Spring Batch creerà le tabelle necessarie per il JobRepository al primo avvio
           job:
             enabled: false # Disabilita l'auto-esecuzione di tutti i job all'avvio, li lanceremo manualmente

       application:
         security:
           jwt:
             secret-key: ${JWT_SECRET_KEY:changeme}

       eureka:
         client:
           serviceUrl:
             defaultZone: http://gestionale-eureka-server:8761/eureka/ # Indirizzo dell'Eureka Server

       File: D:\Progetti\Git\Gestionale\batch-service\pom.xml
       <?xml version="1.0" encoding="UTF-8"?>
       <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>3.5.3</version>
                <relativePath/> <!-- lookup parent from repository -->
        </parent>
        <groupId>com.PierLorrai.Gestionale</groupId>
        <artifactId>batch-service</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>batch-service</name>
        <description>batch service del gestionale</description>
        <url/>
        <licenses>
                <license/>
        </licenses>
        <developers>
                <developer/>
        </developers>
        <scm>
                <connection/>
                <developerConnection/>
                <tag/>
                <url/>
        </scm>
        <properties>
                <java.version>17</java.version>
                <spring-cloud.version>2025.0.0</spring-cloud.version>
        </properties>
        <dependencies>
                <dependency>
                        <groupId>com.PierLorrai.Gestionale</groupId>
                        <artifactId>management-service</artifactId>
                        <version>0.0.1-SNAPSHOT</version>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-data-jpa</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                </dependency>



                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-batch</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-api</artifactId>
                        <version>0.11.5</version>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-impl</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>io.jsonwebtoken</groupId>
                        <artifactId>jjwt-jackson</artifactId>
                        <version>0.11.5</version>
                        <scope>runtime</scope>
                </dependency>

                <dependency>
                        <groupId>com.oracle.database.jdbc</groupId>
                        <artifactId>ojdbc11</artifactId>
                        <scope>runtime</scope>
                </dependency>
                <dependency>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <optional>true</optional>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-devtools</artifactId>
                        <scope>runtime</scope>
                        <optional>true</optional>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-test</artifactId>
                        <scope>test</scope>
                </dependency>
                <dependency>
                        <groupId>org.springframework.batch</groupId>
                        <artifactId>spring-batch-test</artifactId>
                        <scope>test</scope>
                </dependency>

        </dependencies>
        <dependencyManagement>
                <dependencies>
                        <dependency>
                                <groupId>org.springframework.cloud</groupId>
                                <artifactId>spring-cloud-dependencies</artifactId>
                                <version>${spring-cloud.version}</version>
                                <type>pom</type>
                                <scope>import</scope>
                        </dependency>
                </dependencies>
        </dependencyManagement>

        <build>
                <plugins>
                        <plugin>
                                <groupId>org.apache.maven.plugins</groupId>
                                <artifactId>maven-compiler-plugin</artifactId>
                                <configuration>
                                        <annotationProcessorPaths>
                                                <path>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </path>
                                        </annotationProcessorPaths>
                                </configuration>
                        </plugin>
                        <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <configuration>
                                        <excludes>
                                                <exclude>
                                                        <groupId>org.projectlombok</groupId>
                                                        <artifactId>lombok</artifactId>
                                                </exclude>
                                        </excludes>
                                </configuration>
                        </plugin>
                </plugins>
        </build>

       </project>

       ---
       CRITICAL FINDINGS & ISSUES

       1. API Gateway Has Unused JWT Dependencies

       - Gateway has JJWT 0.11.5 dependencies in pom.xml but NO filter implementation
       - Uses Spring Cloud Gateway (reactive) but only has a simple logging filter
       - Does NOT validate JWTs before routing to backend services
       - CORS configuration allows all headers and methods

       2. Inconsistent JWT Validation Logic Across Services

       Security-Service (generates tokens):
       - isTokenValid(token, UserDetails) - validates token signature AND checks username matches UserDetails AND checks expiration
       - Has generateToken() method with full HS256 signing

       Management-Service (validates tokens):
       - isTokenValid(token) - only checks token signature and expiration (NO username validation)
       - NO generateToken() method
       - Creates auth token with hardcoded ROLE_USER authority

       Batch-Service (validates tokens):
       - Identical to Management-Service
       - isTokenValid(token) - only signature and expiration validation
       - NO generateToken() method
       - Creates auth token with hardcoded ROLE_USER authority

       3. Different Spring Boot Versions

       - API Gateway: 3.2.7 (Spring Cloud 2023.0.2)
       - Security-Service: 3.3.1 (Spring Cloud 2023.0.2)
       - Management-Service: 3.5.3 (Spring Cloud 2025.0.0)
       - Batch-Service: 3.5.3 (Spring Cloud 2025.0.0)

       4. Different JWT Configuration Approaches

       Security-Service:
       - JwtProperties includes both secretKey and expiration (3600000ms = 1 hour)

       Management-Service & Batch-Service:
       - JwtProperties includes only secretKey
       - Never generate tokens, so expiration not needed

       5. JWT Token Validation Discrepancies

       Security-Service JwtAuthFilter:
       UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
       if (jwtService.isTokenValid(jwt, userDetails)) {
           // Creates UsernamePasswordAuthenticationToken with actual UserDetails and authorities
       }

       Management & Batch JwtAuthFilter:
       if (jwtService.isTokenValid(jwt)) {
           UsernamePasswordAuthenticationToken authToken =
                   new UsernamePasswordAuthenticationToken(
                           username,           // Just string username
                           null,
                           List.of(new SimpleGrantedAuthority("ROLE_USER"))  // HARDCODED
                   );
       }

       6. Security-Service Routes Through Gateway

       - Gateway routes /api/auth/** to lb://security-service on port 8081
       - But gateway does NOT validate JWTs before routing
       - Public endpoints are permissive: /api/auth/register and /api/auth/authenticate are allowed without auth

       7. No Centralized JWT Validation at Gateway Level

       - Each service independently validates JWTs
       - If gateway were compromised or misconfigured, invalid tokens could reach backend services
       - Management and Batch services don't actually verify the JWT contains the claimed username

       ---
       SUMMARY OF CURRENT STATE
       ┌────────────────────┬───────────────────┬─────────────────┬──────────────┬───────────────────┐
       │     Component      │  JWT Generation   │ JWT Validation  │ Filter Chain │ Expiration Config │
       ├────────────────────┼───────────────────┼─────────────────┼──────────────┼───────────────────┤
       │ API Gateway        │ Dependencies only │ NOT IMPLEMENTED │ Logging only │ N/A               │
       ├────────────────────┼───────────────────┼─────────────────┼──────────────┼───────────────────┤
       │ Security-Service   │ YES (full)        │ YES (strict)    │ Configured   │ 1 hour            │
       ├────────────────────┼───────────────────┼─────────────────┼──────────────┼───────────────────┤
       │ Management-Service │ NO                │ YES (basic)     │ Configured   │ Not set           │
       ├────────────────────┼───────────────────┼─────────────────┼──────────────┼───────────────────┤
       │ Batch-Service      │ NO                │ YES (basic)     │ Configured   │ Not set           │
       └────────────────────┴───────────────────┴─────────────────┴──────────────┴───────────────────┘
       Critical Gap: The API Gateway has no JWT validation, making it a potential entry point for invalid or tampered tokens to reach backend services.
  ⎿  Done (33 tool uses · 43.7k tokens · 4m 0s)

∴ Thinking…

  Now I have a thorough understanding of the backend. Let me now design the plan for implementing the high priority tasks. Let me launch a Plan agent to design the implementation.

● Excellent, I now have deep knowledge of the entire backend. Let me design the implementation plan.                                                                   02:09 PM  claude-opus-4-5-20251101

● Plan(Design implementation plan)
  ⎿  Prompt:
       Design a detailed implementation plan for 6 high-priority backend tasks in a Spring Boot microservices system. The system has:

       - API Gateway (port 8080, Spring Cloud Gateway reactive, Spring Boot 3.2.7, has JJWT deps but NO JWT filter)
       - Security Service (port 8081, Spring Boot 3.3.1, generates JWTs with HS256, 1h expiry, has UserDetails/roles)
       - Management Service (port 8082, Spring Boot 3.5.3, validates JWTs without UserDetails, hardcodes ROLE_USER)
       - Batch Service (port 8083, Spring Boot 3.5.3, same as management)
       - All use Oracle DB (FREEPDB1), Eureka discovery, JJWT 0.11.5
       - Management has entities: Customer, Product, Order, OrderItem (all with JPA sequences)
       - Security has entities: User (implements UserDetails), Role
       - Flyway manages migrations (security-service owns all migrations)

       Tasks to implement:

       1. Pagination, sorting, and filtering on all list endpoints

       - Management service: Customer, Product, Order list endpoints
       - Security service: User list endpoint
       - Need Spring Data Pageable support
       - Return Page with totalElements, totalPages, etc.
       - Support: ?page=0&size=10&sort=name,asc&filter=searchTerm

       2. API Gateway JWT validation (pre-filter)

       - Gateway is reactive (WebFlux), cannot use servlet filters
       - Need GatewayFilter or GlobalFilter that validates JWT before routing
       - Should skip /api/auth/register and /api/auth/authenticate
       - Return 401 immediately for invalid/expired tokens
       - Gateway already has JJWT dependencies

       3. API Gateway rate limiting

       - Spring Cloud Gateway has built-in RequestRateLimiter
       - Options: Redis-based (requires Redis) or in-memory
       - Need per-IP or per-user rate limiting
       - Current setup has no Redis

       4. Proper error response DTOs (standardized format)

       - Security service has GlobalExceptionHandler returning plain strings
       - Management service has minimal exception handling
       - Need consistent error format: { timestamp, status, error, message, path }
       - Apply to both services

       5. Audit trail (created_by, updated_by)

       - Add columns to Customer, Product, Order, OrderItem tables
       - Use JPA @PrePersist/@PreUpdate or Spring Data AuditorAware
       - Need to extract username from JWT SecurityContext
       - Requires Flyway migration to add columns

       6. Refresh token mechanism

       - Currently only access tokens with 1h expiry
       - Need refresh token (longer-lived, stored in DB)
       - Endpoints: POST /api/auth/refresh, POST /api/auth/logout (invalidate refresh token)
       - Need new RefreshToken entity + migration

       Design constraints:

       - Gateway uses Spring WebFlux (reactive), NOT Spring MVC
       - Each service has its own SecurityConfig
       - JWT secret key is shared across all services via env var
       - Flyway migrations run from security-service only (schema GESTIONALE_OWNER)
       - Management and Batch services use MANAGEMENT_USER and BATCH_USER respectively (need GRANT statements)
       - For rate limiting, prefer in-memory solution (no Redis dependency) unless Redis is clearly better

       For each task, provide:

       1. Exact files to create/modify (with full paths)
       2. Key code patterns and class signatures
       3. Migration SQL if needed
       4. Configuration changes
       5. Interaction with Angular frontend (if any)
       6. Order of implementation (dependencies between tasks)

       Recommend the optimal implementation order considering dependencies between tasks.

     ❯ Design a detailed implementation plan for 6 high-priority backend tasks in a Spring Boot microservices system. The system has:
     Waiting…"D:\Progetti\Git\Gestionale")
     Waiting…"D:\Progetti\Git\Gestionale" -la 2>nul || dir "D:\Progetti\Git\Gestionale" /b)


     Search(pattern: "**/*.java", path: "D:\Progetti\Git\Gestionale\api-gateway")
     Search(pattern: "**/*.java", path: "D:\Progetti\Git\Gestionale\security-service")
     Search(pattern: "**/*.java", path: "D:\Progetti\Git\Gestionale\management-service")



     Search(pattern: "**/*.java", path: "D:\Progetti\Git\Gestionale\batch-service")

     Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\filter\LoggingGlobalFilter.java)

     Read(D:\Progetti\Git\Gestionale\api-gateway\src\main\java\com\PierLorrai\Gestionale\api_gateway\config\CorsConfig.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\JwtService.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\SecurityConfig.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtAuthFilter.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\model\User.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\model\Role.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\controller\AuthController.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\AuthService.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\controller\UserController.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\service\UserService.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\repository\UserRepository.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\exception\GlobalExceptionHandler.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\JwtProperties.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\dto\AuthResponse.java)

     Read(D:\Progetti\Git\Gestionale\security-service\src\main\java\com\PierLorrai\Gestionale\config\ApplicationConfig.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\controller\CustomerController.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\controller\ProductController.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\controller\OrderController.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\service\CustomerService.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\service\ProductService.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\service\OrderService.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\model\Customer.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\model\Product.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\model\Order.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\model\OrderItem.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\repository\CustomerRepository.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\repository\ProductRepository.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\repository\OrderRepository.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\SecurityConfig.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtAuthFilter.java)

     Read(D:\Progetti\Git\Gestionale\management-service\src\main\java\com\PierLorrai\Gestionale\management_service\config\JwtService.java)