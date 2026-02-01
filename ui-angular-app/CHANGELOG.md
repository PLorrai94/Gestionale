# UI Angular App - Changelog

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
