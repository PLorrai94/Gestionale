# Angular App Improvement Plan

## Phase 1: Fix Existing Issues

- [ ] **1.1** Clean up `main.ts` + consolidate JWT interceptor into single functional interceptor in `app.config.ts`. Delete class-based `jwt.interceptor.ts`.
- [ ] **1.2** Fix ProductService hardcoded URL (`localhost:8082` -> `/api/management/products`). Add CRUD methods. Add `stock` to Product model.
- [ ] **1.3** Delete misidentified `products.ts` (Injectable used as Component). Fix routes: point `products` to `ProductsPageComponent`, remove `products/all`.
- [ ] **1.4** Wire product search to table: Output on search form, Input on table, orchestrate in ProductsPageComponent.
- [ ] **1.5** Create UserService + User model. Implement profile save in `user-profile.component.ts`.
- [ ] **1.6** Add `takeUntilDestroyed` to subscriptions in navbar, home.
- [ ] **1.7** Fix Dashboard logout to use `AuthService.logout()`.

---

## Phase 2: Build Missing CRUD Pages

- [ ] **2.0a** Notification/Toast service + component (shared infrastructure).
- [ ] **2.0b** Confirm Dialog service + component (shared infrastructure).
- [ ] **2.0c** Update sidebar navigation with all page links.
- [ ] **2.1** Customers page: model, service, list component, form component. Routes: `/customers`, `/customers/new`, `/customers/:id/edit`.
- [ ] **2.2** Product create/edit/delete: form component, actions column in table. Routes: `/products/new`, `/products/:id/edit`.
- [ ] **2.3** Orders page: model, service, list (status badges), detail (status actions), form (dynamic items). Routes: `/orders`, `/orders/new`, `/orders/:id`.
- [ ] **2.4** User Management (admin): list + form components. Routes: `/admin/users`, `/admin/users/new`, `/admin/users/:id/edit`.

---

## Phase 3: Dashboard Redesign

- [ ] **3.1** Replace placeholder dashboard with: summary cards (product/customer/order counts, revenue), recent orders table, quick action buttons.

---

## Files to Delete
- `src/app/pages/products/products.ts` + `.html` + `.css`
- `src/app/core/interceptors/jwt.interceptor.ts`

## Files to Modify
`main.ts`, `app.config.ts`, `app.routes.ts`, `product.service.ts`, `product.ts`, `product-search-form.ts`, `product-table.ts`+`.html`, `products-page.ts`+`.html`, `user-profile.component.ts`, `navbar.component.ts`, `home.ts`, `dashboard.ts`+`.html`+`.css`, `layout.component.ts`+`.html`, `profile-sidebar.html`

## New Files (~37)
Models (3), Services (4), Components (10 x ts/html/css), admin guard (1)
