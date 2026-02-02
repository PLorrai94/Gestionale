# UI Angular App - Status

## Overview

| Property | Value |
|---|---|
| Port | 4200 (dev) / 80 (prod via nginx) |
| Status | Mostly implemented |
| Dockerized | Yes |
| Last Updated | 2026-02-01 |

## Description

Angular standalone-component SPA serving as the frontend for the Gestionale platform. Uses lazy-loaded routes, RxJS for state, and proxies API requests to the gateway. The application follows a modular structure with feature-based routing.

## Tech Stack

- Angular 20.1 (standalone components, no NgModules)
- TypeScript 5.8
- RxJS 7.8
- Karma/Jasmine for tests

## Key Pages

| Route | Description | Status |
|---|---|---|
| `/dashboard` | Summary cards (products, customers, pending orders, revenue) | ✅ Implemented |
| `/products` | Products management (list, create, edit) | ✅ Implemented |
| `/orders` | Orders management (list, create, detail) | ✅ Implemented |
| `/customers` | Customers management (list, create, edit) | ✅ Implemented |
| `/batch` | Batch job trigger with status display | ✅ Implemented |
| `/reports` | Reports dashboard with analytics | ⚠️ Basic placeholder |
| `/auth/login` | Login page | ✅ Implemented |
| `/auth/register` | Registration page with profile fields | ✅ Implemented |
| `/profile` | User profile page | ✅ Implemented |
| `/admin/users` | User management (admin) | ✅ Implemented |

## Implemented Features

- Dashboard with summary cards
- Full CRUD for Products, Orders, Customers
- Batch job trigger with real-time status and notification feedback
- Login and registration components with reactive forms
- JWT interceptor for authenticated API calls
- Registration form with comprehensive validation matching backend constraints
- Nginx reverse proxy for Docker deployment (routes `/api/*` to gateway)
- Development proxy (`proxy.conf.json`) routing `/api` to gateway port 8080
- Role-based route protection (authGuard, loginGuard)
- Notification service for user feedback
- Responsive layout with sidebar navigation

## Components

- **Core services:** AuthService, BatchService, ProductService, OrderService, CustomerService, UserService
- **Auth pages:** LoginComponent, RegisterComponent (both standalone)
- **Business pages:** DashboardComponent, BatchComponent, ProductsPage, OrdersPage, CustomersPage
- **Admin pages:** UserListComponent, UserFormComponent
- **Shared:** NotificationService, LayoutComponent, FooterComponent, ProfileSidebarComponent

## Backend Integration

All frontend services communicate with the backend via the API Gateway (port 8080). The proxy configuration ensures seamless API calls during development and production.

## Testing Status

- Unit tests: Partially implemented (Karma/Jasmine)
- E2E tests: Not yet implemented
- Code coverage: To be measured

## Missing Features

- Reports dashboard with real charts (currently placeholder)
- Password strength indicator in registration
- Confirm dialog service for delete operations
- Advanced search and filtering with pagination
- Export functionality (CSV, PDF)
- Real-time notifications using WebSocket
- Dark mode theme
- Multi-language support (i18n)
- Comprehensive test suite

## Next Steps

1. Implement a chart library (e.g., Chart.js or ngx-charts) for the reports page.
2. Add a confirm dialog service to handle delete operations.
3. Enhance the notification service with more options.
4. Write unit tests for all components and services.
5. Implement E2E tests with Cypress or Playwright.
