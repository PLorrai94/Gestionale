# UI Angular App - Changelog

## 2026-02-02 — Privileged Guard and Batch Access Control

### What
1. **New `privilegedGuard`:** Created `guards/privileged.guard.ts` that checks the JWT `roles` claim for ADMIN or MANAGER roles. Redirects unauthorized users to `/dashboard`.
2. **Batch route restricted:** Changed the `/batch` route guard from `authGuard` (any logged-in user) to `privilegedGuard` (ADMIN or MANAGER only).
3. **Sidebar conditional batch link:** The "Batch Jobs" link in the sidebar is now only visible to users with ADMIN or MANAGER roles. Added `isPrivileged` getter and refactored role checking into a shared `hasAnyRole` helper method.

### Why
Batch jobs should only be accessible to privileged users. Previously any authenticated user could see and access the batch page. Now the sidebar hides the link and the route guard blocks direct URL access for non-privileged users.

### Files
- `src/app/guards/privileged.guard.ts` — New guard for ADMIN+MANAGER
- `src/app/app.routes.ts` — Batch route uses `privilegedGuard`
- `src/app/shared/sidebar/sidebar.component.ts` — Added `isPrivileged` getter, refactored role checks
- `src/app/shared/sidebar/sidebar.component.html` — Batch link wrapped in `@if (isPrivileged)`

---

## 2026-02-02 — Comprehensive Logic Fixes and English Translation

### What
- **Fixed critical bootstrap issues in main.ts and app.config.ts**: Removed duplicate providers (provideHttpClient, provideRouter, provideAnimations were all registered twice). Removed unused AppConfigService loading. Replaced broken JWT interceptor that read wrong localStorage key (`jwt` instead of `currentUser`) with a functional interceptor using `inject(AuthService)`.
- **Fixed ProductService**: Changed from hardcoded `http://localhost:8082/products` to `/api/management/products` (through gateway). Added pagination support matching other services.
- **Fixed routing**: Added missing routes for customers, orders, batch, admin/users (create/edit). Applied `adminGuard` to admin routes. Removed unused `ProfileSidebarComponent` import.
- **Fixed layout**: Switched from old `ProfileSidebarComponent` (in pages/products/) to shared `SidebarComponent` (in shared/sidebar/) which has proper navigation links and admin role checking.
- **Fixed dashboard**: Replaced stub (Italian inline template) with functional component that loads real data from ProductService, CustomerService, and OrderService using `forkJoin`. Added quick action links.
- **Fixed batch component**: Replaced stub ("batch works!") with functional component using BatchService and NotificationService for user feedback.
- **Fixed footer**: Removed `@fadeIn` animation trigger that caused runtime error (not registered in component). Replaced dead links (/features, /pricing, /docs) with real app routes. Translated to English.
- **Fixed home page**: Translated all Italian text to English. Removed batch job trigger logic (belongs on /batch page). Removed fake statistics counter. Added link to `/batch` for Batch Service feature card. Fixed memory leak by properly unsubscribing scroll listener.
- **Fixed auth service**: Removed all debug console.log/console.error statements (14+ instances). Removed unnecessary `withCredentials: true` and explicit Content-Type headers. Removed unused `refreshUserFromStorage` method and `RegisterPayload` type alias.
- **Fixed login/register components**: Removed `HttpClientModule` imports (bypassed interceptors by creating second HttpClient instance). Added `RouterModule` import for routerLink directives. Translated Italian error messages to English. Removed console.log statements.
- **Fixed products.ts**: Was incorrectly declared as `@Injectable` (service) instead of `@Component`. Rewrote as proper component.
- **Fixed product-table and order-form**: Updated to handle new `PageResponse<Product>` return type from ProductService.
- **Fixed products-page**: Removed old ProfileSidebarComponent import (sidebar is in layout).
- **Translated all Italian text**: Translated 60+ Italian strings across all HTML templates and TypeScript notification messages to English.
- **Removed console statements**: Cleaned all console.log/console.error from auth.ts, home.ts, login.ts, register.ts, user-profile.ts, product-search-form.ts.

### Why
The app had multiple critical bugs preventing proper operation: broken JWT interceptor (auth tokens never sent), ProductService bypassing the API gateway, missing routes for most pages, stub dashboard and batch components, runtime errors from unregistered animations, and mixed Italian/English text throughout.

### Files
- `src/main.ts` — Simplified, removed duplicate providers and AppConfigService
- `src/app/app.config.ts` — Rewritten as constant with proper JWT interceptor
- `src/app/app.routes.ts` — Added all missing routes, adminGuard for admin pages
- `src/app/core/services/auth.ts` — Removed debug logging and unused code
- `src/app/core/services/product.service.ts` — Fixed URL, added pagination
- `src/app/core/services/batch.service.ts` — Unchanged (already correct)
- `src/app/shared/layout/layout.component.ts` — Use shared SidebarComponent
- `src/app/shared/layout/layout.component.html` — Use `<app-sidebar>` tag
- `src/app/shared/footer/footer.component.html` — Fixed dead links, translated
- `src/app/shared/navbar/navbar.component.html` — Translated
- `src/app/pages/dashboard/dashboard.ts` — Rewritten with real API data
- `src/app/pages/dashboard/dashboard.html` — New functional template
- `src/app/pages/dashboard/dashboard.css` — New styles
- `src/app/pages/batch/batch.ts` — Rewritten with BatchService integration
- `src/app/pages/batch/batch.html` — New functional template
- `src/app/pages/batch/batch.css` — New styles
- `src/app/pages/home/home.ts` — Removed batch logic, stats, translated
- `src/app/pages/home/home.html` — Translated, removed stats/batch sections
- `src/app/pages/auth/login/login.ts` — Removed HttpClientModule, console.log, translated
- `src/app/pages/auth/login/login.html` — Translated
- `src/app/pages/auth/register/register.ts` — Removed HttpClientModule, fixed imports, translated
- `src/app/pages/auth/register/register.html` — Translated
- `src/app/pages/products/products.ts` — Rewritten as proper Component
- `src/app/pages/products/product-table/product-table.ts` — Fixed for PageResponse
- `src/app/pages/products/products-page/products-page.ts` — Removed old sidebar import
- `src/app/pages/products/products-page/products-page.html` — Removed sidebar tag
- `src/app/pages/products/product-form/product-form.component.html` — Translated
- `src/app/pages/products/product-search-form/product-search-form.html` — Translated
- `src/app/pages/products/product-search-form/product-search-form.ts` — Removed console.log
- `src/app/pages/products/product-table/product-table.html` — Translated
- `src/app/pages/customers/customer-list/customer-list.component.ts` — Translated notifications
- `src/app/pages/customers/customer-list/customer-list.component.html` — Translated
- `src/app/pages/customers/customer-form/customer-form.component.ts` — Translated notifications
- `src/app/pages/customers/customer-form/customer-form.component.html` — Translated
- `src/app/pages/orders/order-list/order-list.component.ts` — Translated notifications
- `src/app/pages/orders/order-list/order-list.component.html` — Translated
- `src/app/pages/orders/order-form/order-form.component.ts` — Fixed ProductService usage, translated
- `src/app/pages/orders/order-form/order-form.component.html` — Translated
- `src/app/pages/orders/order-detail/order-detail.component.ts` — Translated notifications
- `src/app/pages/orders/order-detail/order-detail.component.html` — Translated
- `src/app/pages/admin/user-list/user-list.component.ts` — Translated notifications
- `src/app/pages/admin/user-list/user-list.component.html` — Translated
- `src/app/pages/admin/user-form/user-form.component.ts` — Translated notifications
- `src/app/pages/admin/user-form/user-form.component.html` — Translated
- `src/app/pages/profile/user-profile.component.ts` — Removed console.log
- `src/app/pages/profile/user-profile.component.html` — Translated

---

## 2026-01-31 — Debugging 401 Registration Error

### What
Added comprehensive logging to diagnose persistent 401 Unauthorized error during registration:
- Enhanced AuthService logging with detailed request/response output
- Enhanced JWT interceptor logging to verify auth header handling
- Added explicit `Content-Type: application/json` header on registration requests

### Why
Registration endpoint returned 401 despite previous fixes. Needed to isolate whether the issue was in frontend request formatting or backend configuration.

### Files
- `src/app/core/services/auth.ts`
- `src/app/app.config.ts`

---

## 2026-01-31 — API Gateway Connectivity Fix

### What
Enhanced nginx configuration and verified Docker network connectivity to resolve 404 errors for API requests.

### Why
Angular UI was returning 404 for `/api/auth/register` due to nginx routing issues and potential Docker network problems.

### Files
- `nginx.conf`

---

## 2026-01-31 — Nginx Docker DNS Configuration

### What
- Added Docker DNS resolver (`127.0.0.11`) to nginx for service name resolution
- Added debug headers (`X-Proxy-Pass`, `X-Request-URI`) for tracing
- Enabled detailed access and error logging
- Used variable-based `proxy_pass` for dynamic DNS resolution

### Why
Nginx was not resolving `api-gateway` service name to its container IP without explicit Docker DNS configuration.

### Files
- `nginx.conf`

---

## 2026-01-31 — Docker and Proxy Configuration Fix

### What
- Updated Dockerfile to include custom nginx configuration for API proxying
- Created `nginx.conf` to route `/api/*` to `http://api-gateway:8080`
- Updated `proxy.conf.json` to use API Gateway (port 8080) as single entry point

### Why
Angular container in Docker could not reach backend APIs without nginx proxy configuration.

### Files
- `Dockerfile`
- `nginx.conf` (new)
- `proxy.conf.json`

---

## 2026-01-31 — Build Success and Component Consolidation

### What
Resolved all TypeScript compilation errors and consolidated registration components. Ensured only one registration component (`register.ts`) is active with proper template and styling.

### Why
Multiple registration components with different templates were causing confusion and compilation errors.

### Files
- `src/app/pages/auth/register/register.ts`
- `src/app/pages/auth/register/register.html`
- `src/app/pages/auth/register/register.css`
- `src/app/pages/batch/batch.ts`

---

## 2026-01-31 — Angular Build Error Fixes

### What
- Added missing `loading` property to `RegisterComponent`
- Replaced incorrect `RegisterPayload` import with `UserRegistrationRequest`
- Fixed NotificationService usage in batch component (string instead of object)

### Why
Angular build failed due to missing properties, wrong imports, and type mismatches.

### Files
- `src/app/pages/auth/register/register.ts`
- `src/app/pages/batch/batch.ts`
- `src/app/pages/auth/register/register.html`

---

## 2026-01-31 — Angular App Improvements and Bug Fixes

### What
- Improved registration form validation (proper form control marking)
- Enhanced JWT interceptor (fixed token refresh logic, update stored tokens)
- Added better error handling in batch service
- Fixed registration component loading state management

### Why
Several issues identified: form didn't mark fields as touched on invalid submit, JWT interceptor had refresh bugs, batch service didn't propagate errors properly.

### Files
- `src/app/pages/auth/register/register.component.ts`
- `src/app/app.config.ts`
- `src/app/core/services/batch.service.ts`

---

## 2026-01-31 — Batch Component Implementation

### What
- Fixed batch service endpoint to correct URL (`/api/batch/start-process-orders-job`)
- Created fully functional batch component with real-time status, loading state, and notifications
- Added HTML template and CSS styling
- Updated batch service to use `inject()` function

### Why
Batch processing functionality was incomplete: wrong endpoint, empty component, no way to trigger or monitor jobs through the UI.

### Files
- `src/app/core/services/batch.service.ts`
- `src/app/pages/batch/batch.ts`
- `src/app/pages/batch/batch.html` (new)
- `src/app/pages/batch/batch.css` (new)

---

## 2026-01-31 — Frontend Bug Fixes

### What
- Fixed duplicate code in registration component (TS, HTML, CSS)
- Updated JWT interceptor to use correct API URLs (`/api/auth` instead of `/api/security/auth`)
- Removed duplicate content causing compilation errors

### Why
Duplicate code caused runtime and compilation errors. JWT interceptor used incorrect URLs that didn't match gateway routing.

### Files
- `src/app/pages/auth/register/register.component.ts`
- `src/app/pages/auth/register/register.component.html`
- `src/app/pages/auth/register/register.component.css`
- `src/app/app.config.ts`

---

## 2026-01-31 — Registration Component Implementation

### What
- Updated AuthService to use correct API URL (`/api/auth`)
- Implemented `register` method using `UserRegistrationRequest` interface
- Created `UserRegistrationRequest` model matching Java DTO
- Created registration component with reactive form and validation
- Auto-login after successful registration

### Why
Backend registration was enhanced with additional fields but the frontend was not updated to match.

### Files
- `src/app/core/services/auth.ts`
- `src/app/core/models/user-registration-request.model.ts` (new)
- `src/app/pages/auth/register/register.component.ts` (new)
- `src/app/pages/auth/register/register.component.html` (new)
- `src/app/pages/auth/register/register.component.css` (new)

---

## 2026-01-31 — Authentication Components Creation

### What
Created missing login and registration components:
- Login component with reactive form, validation, and AuthService integration
- Registration component with comprehensive validation matching backend
- CSS styling for both components
- All components are standalone (Angular 17+ architecture)

### Why
Routes for `/auth/login` and `/auth/register` were configured but the actual components were missing, causing runtime errors.

### Files
- `src/app/pages/auth/login/login.component.ts` (new)
- `src/app/pages/auth/login/login.component.html` (new)
- `src/app/pages/auth/login/login.component.css` (new)
- `src/app/pages/auth/register/register.component.ts` (new)
- `src/app/pages/auth/register/register.component.html` (new)
- `src/app/pages/auth/register/register.component.css` (new)
