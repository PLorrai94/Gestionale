# UI Angular App - Status

## Overview

| Property | Value |
|---|---|
| Port | 4200 (dev) / 80 (prod via nginx) |
| Status | Partially implemented |
| Dockerized | Yes |

## Description

Angular standalone-component SPA serving as the frontend for the Gestionale platform. Uses lazy-loaded routes, RxJS for state, and proxies API requests to the gateway.

## Tech Stack

- Angular 20.1 (standalone components, no NgModules)
- TypeScript 5.8
- RxJS 7.8
- Karma/Jasmine for tests

## Key Pages

| Route | Description |
|---|---|
| `/dashboard` | Summary cards (products, customers, pending orders, revenue) |
| `/products` | Products management |
| `/orders` | Orders management |
| `/batch` | Batch job trigger with status display |
| `/auth/login` | Login page |
| `/auth/register` | Registration page with profile fields |

## Implemented Features

- Dashboard with summary cards
- Products and orders list views
- Batch job trigger with real-time status and notification feedback
- Login and registration components with reactive forms
- JWT interceptor for authenticated API calls
- Registration form with comprehensive validation matching backend constraints
- Nginx reverse proxy for Docker deployment (routes `/api/*` to gateway)
- Development proxy (`proxy.conf.json`) routing `/api` to gateway port 8080

## Components

- **Core services:** AuthService, BatchService, ProductService
- **Auth pages:** LoginComponent, RegisterComponent (both standalone)
- **Business pages:** DashboardComponent, BatchComponent, ProductsPage
- **Shared:** NotificationService

## Missing Features

- Customer CRUD pages
- Product create/edit/delete forms
- Order detail and creation forms
- User management (admin) pages
- User profile page
- Notification/toast service (shared infrastructure)
- Confirm dialog service
- Sidebar navigation with all page links
- `takeUntilDestroyed` on subscriptions
- Password strength indicator
