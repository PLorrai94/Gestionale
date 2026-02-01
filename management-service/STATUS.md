# Management Service - Status

## Overview

| Property | Value |
|---|---|
| Port | 8082 |
| Status | Implemented (core CRUD) |
| Dockerized | Yes |

## Description

Core business logic service managing customers, products, and orders. Provides full CRUD operations with validation and business rules.

## Database

- **Tables:** CUSTOMER, PRODUCT, ORDERS, ORDER_ITEM
- **DB User:** `MANAGEMENT_USER`
- **Note:** Tables created by Flyway migrations in security-service

## API Endpoints

### Customers (`/api/management/customers`)

| Method | Path | Description |
|---|---|---|
| GET | `/` | List all customers |
| GET | `/{id}` | Get customer by ID |
| POST | `/` | Create customer (validated) |
| PUT | `/{id}` | Update customer (validated) |
| DELETE | `/{id}` | Delete customer |

### Products (`/api/management/products`)

| Method | Path | Description |
|---|---|---|
| GET | `/` | List all products |
| GET | `/{id}` | Get product by ID |
| POST | `/` | Create product (validated) |
| PUT | `/{id}` | Update product (validated) |
| DELETE | `/{id}` | Delete product |

### Orders (`/api/management/orders`)

| Method | Path | Description |
|---|---|---|
| GET | `/` | List all orders |
| GET | `/{id}` | Get order by ID |
| POST | `/` | Create order (validated, stock check, total calc) |
| PUT | `/{id}/status` | Update order status |
| POST | `/{id}/cancel` | Cancel order (restores stock) |
| DELETE | `/{id}` | Delete order |
| GET | `/by-customer/{customerId}` | Get orders by customer |

## Implemented Features

- Full CRUD for customers, products, and orders
- Order creation validates customer/product existence, checks stock, calculates totals, deducts stock
- Order cancellation restores product stock
- Duplicate email check on customer creation
- JWT auth filter (validates token signature and expiry, stateless)
- Input validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`, `@NotNull`, `@Positive`)
- GlobalExceptionHandler to prevent stack trace leaks
- Secrets externalized via environment variables

## Components

- **Controllers:** CustomerController, OrderController, ProductController
- **Services:** CustomerService, OrderService, ProductService
- **Repositories:** CustomerRepository, OrderRepository, OrderItemRepository, ProductRepository
- **Models:** Customer, Product, Order, OrderItem
- **Config:** SecurityConfig, JwtAuthFilter, JwtProperties, JwtService
- **Exceptions:** GlobalExceptionHandler, DuplicateEmailException

## Missing Features

- Pagination on list endpoints
- Search/filter capabilities
- Sorting options
- Audit trail (created_by, updated_by on all entities) -- `Auditable` base class exists, needs integration
- Invoice generation
- Reporting/analytics endpoints
- Standardized error response DTOs
- API documentation (Swagger/OpenAPI)
- Unit and integration tests
