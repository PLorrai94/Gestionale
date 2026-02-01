# Batch Service - Status

## Overview

| Property | Value |
|---|---|
| Port | 8083 |
| Status | Partially implemented (single job) |
| Dockerized | Yes |

## Description

Spring Batch service for asynchronous processing of pending orders. Currently supports a single batch job that changes PENDING orders to PROCESSED.

## Database

- **DB User:** `BATCH_USER`
- **Note:** Uses shared tables (ORDERS, ORDER_ITEM, etc.) created by Flyway in security-service

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/batch/start-process-orders-job` | Trigger order processing batch job |

## Implemented Features

- `processPendingOrdersJob` batch job (reads PENDING orders, sets status to PROCESSED, chunk size 10)
- Manual trigger endpoint
- JWT auth filter (validates token signature and expiry, stateless)
- Secrets externalized via environment variables

## Components

- **Controllers:** BatchController
- **Config:** BatchConfig, SecurityConfig, JwtAuthFilter, JwtProperties, JwtService
- **Shared Models:** Order, Customer, OrderItem, Product, OrderRepository

## Missing Features

- Job status check endpoint
- Job history endpoint
- Scheduled execution (currently manual trigger only)
- Additional batch jobs (report generation, data cleanup)
- Standardized error response DTOs
- API documentation (Swagger/OpenAPI)
- Unit and integration tests
