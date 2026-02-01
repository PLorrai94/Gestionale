# UI Angular App - Full Overhaul Tasks

Each task is self-contained with exact file paths and instructions.
Work through phases in order -- later phases may depend on earlier ones.

**App root:** `ui-angular-app/src/app/`

---

## Phase 0: Delete Dead Code

### T0.1 — Delete old login component (replaced by login.component.ts)

The routes currently import from `pages/auth/login/login.ts` (old Italian version with constructor injection, `HttpClientModule` import, animations). A newer English version exists at `login.component.ts` using `inject()`.

**Delete these 3 files:**
- `src/app/pages/auth/login/login.ts`
- `src/app/pages/auth/login/login.html`
- `src/app/pages/auth/login/login.css`

**Keep these 3 files (already exist, no changes needed):**
- `src/app/pages/auth/login/login.component.ts`
- `src/app/pages/auth/login/login.component.html`
- `src/app/pages/auth/login/login.component.css`

**Update `src/app/app.routes.ts`** — change the login route import path:
```typescript
// OLD:
import('./pages/auth/login/login').then(m => m.LoginComponent)
// NEW:
import('./pages/auth/login/login.component').then(m => m.LoginComponent)
```

### T0.2 — Delete old register component (replaced by register.component.ts)

Same situation as login. Old Italian version at `register.ts`, newer English version at `register.component.ts`.

**Delete these 3 files:**
- `src/app/pages/auth/register/register.ts`
- `src/app/pages/auth/register/register.html`
- `src/app/pages/auth/register/register.css`

**Keep these 3 files (already exist, no changes needed):**
- `src/app/pages/auth/register/register.component.ts`
- `src/app/pages/auth/register/register.component.html`
- `src/app/pages/auth/register/register.component.css`

**Update `src/app/app.routes.ts`** — change the register route import path:
```typescript
// OLD:
import('./pages/auth/register/register').then(m => m.RegisterComponent)
// NEW:
import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
```

### T0.3 — Delete animations.ts if only used by deleted files

**File:** `src/app/pages/home/animations.ts`

Check if this file exists and is only imported by the deleted `login.ts` and `register.ts`. The home component (`home.ts`) defines its animations inline, so this file may be dead code.

- If only the deleted files imported it: **delete** `animations.ts`
- If other files still import it: **keep** it

Also check `src/app/shared/animations/fadeIn.ts` — the navbar imports from `../animations/fadeIn`. That one should stay.

### T0.4 — Remove all console.log/console.error debug statements

These were added during debugging and should be removed.

**File: `src/app/app.config.ts`** — Remove ALL `console.log(...)` lines (6 occurrences in `jwtInterceptor` function). Keep the actual logic.

**File: `src/app/core/services/auth.ts`** — Remove these lines:
- Line 33: `console.log('AuthService: Sending registration request to', ...)`
- Line 40: `console.log('Registration successful! Response:', response);`
- Lines 53-56: All `console.error(...)` in the registration `catchError`
- Line 77: `console.error('Login failed:', error);`

**File: `src/app/pages/batch/batch.ts`** — Remove:
- Line 26: `console.log('Batch job response:', response);`
- Line 31: `console.error('Batch job error:', error);`

### T0.5 — Remove unused AppConfigService

`AppConfigService` fetches `assets/config.json` at startup but nothing in the app uses its `apiGatewayUrl` or `securityServiceUrl` getters. All services hardcode relative paths like `/api/auth`. The service adds startup latency for no benefit.

**Delete these files:**
- `src/app/core/app-config.service.ts`
- `src/assets/config.json`

**Modify `src/main.ts`** — simplify to:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

**Modify `src/app/app.config.ts`** — change from function to constant:
```typescript
// OLD:
import { AppConfigService } from './core/app-config.service';
// ... (remove this import)

// OLD:
export function appConfig(config: AppConfigService): ApplicationConfig {
  return {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(withInterceptors([jwtInterceptor])),
      { provide: AppConfigService, useValue: config }
    ]
  };
}

// NEW:
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
```

Remove the `AppConfigService` import and the `provideZoneChangeDetection` import is already there but unused — now use it.

---

## Phase 1: Fix Bugs & Wrong Paths

### T1.1 — Fix UserService API URL

**File:** `src/app/core/services/user.service.ts`

The `apiUrl` is `/api/security/users` which doesn't match any gateway route. The gateway routes are:
- `/api/auth/**` → security-service
- `/api/management/**` → management-service
- `/api/batch/**` → batch-service

The backend UserController lives in security-service. Its endpoints are accessed through the gateway at `/api/auth/users/**`.

**Change:**
```typescript
// OLD:
private apiUrl = '/api/security/users';
// NEW:
private apiUrl = '/api/auth/users';
```

### T1.2 — Add batch route and sidebar link

The batch component exists at `src/app/pages/batch/batch.ts` (exports `Batch` class) but has no route and no sidebar link.

**File: `src/app/app.routes.ts`** — Add this route inside the `children` array (after the `dashboard` route):
```typescript
{
  path: 'batch',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/batch/batch').then(m => m.Batch)
},
```

**File: `src/app/pages/products/profile-sidebar/profile-sidebar.html`** — Add batch link after the orders `<li>`:
```html
<li routerLink="/batch" routerLinkActive="active">
  <i class="icon">&#9881;</i>
  <span *ngIf="!collapsed">Batch Jobs</span>
</li>
```

### T1.3 — Fix footer dead links and outdated content

**File:** `src/app/shared/footer/footer.component.html`

Replace the entire content with:
```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <span>Gestionale</span>
        </div>
        <p>Microservices ERP Platform</p>
      </div>
      <div class="footer-section">
        <h4>Navigation</h4>
        <a routerLink="/dashboard" class="footer-link">Dashboard</a>
        <a routerLink="/products" class="footer-link">Products</a>
        <a routerLink="/orders" class="footer-link">Orders</a>
      </div>
      <div class="footer-section">
        <h4>Management</h4>
        <a routerLink="/customers" class="footer-link">Customers</a>
        <a routerLink="/batch" class="footer-link">Batch Jobs</a>
        <a routerLink="/admin/users" class="footer-link">Users</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Gestionale. All rights reserved.</p>
    </div>
  </div>
</footer>
```

Also remove the `@fadeIn` animation trigger from the `<footer>` tag since FooterComponent doesn't import `fadeIn`. The current template has `<footer class="footer" @fadeIn>` which would cause a runtime error.

**File:** `src/app/shared/footer/footer.component.ts` — no changes needed (the `fadeIn` animation was never registered in this component, so removing `@fadeIn` from the template is the fix).

---

## Phase 2: Architecture Cleanup

### T2.1 — Move ProfileSidebar from pages/products to shared/sidebar

The sidebar is a global layout component but lives at `src/app/pages/products/profile-sidebar/`. It should be in `shared/`.

**Move these 3 files:**
- `src/app/pages/products/profile-sidebar/profile-sidebar.ts` → `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/pages/products/profile-sidebar/profile-sidebar.html` → `src/app/shared/sidebar/sidebar.component.html`
- `src/app/pages/products/profile-sidebar/profile-sidebar.css` → `src/app/shared/sidebar/sidebar.component.css`

**In the moved `.ts` file**, update:
- selector: `app-sidebar` (was `app-profile-sidebar`)
- templateUrl: `./sidebar.component.html`
- styleUrls: `['./sidebar.component.css']`
- Class name: `SidebarComponent` (was `ProfileSidebarComponent`)

**Update `src/app/shared/layout/layout.component.ts`** — fix the import:
```typescript
// OLD:
import { ProfileSidebarComponent } from '../../pages/products/profile-sidebar/profile-sidebar';
// NEW:
import { SidebarComponent } from '../sidebar/sidebar.component';
```
Also update the `imports` array: replace `ProfileSidebarComponent` with `SidebarComponent`.

**Update `src/app/shared/layout/layout.component.html`** — if it uses `<app-profile-sidebar>`, change to `<app-sidebar>`.

**Delete the old directory** `src/app/pages/products/profile-sidebar/` after moving.

### T2.2 — Add role-based admin guard

Admin routes (`/admin/users/**`) use `authGuard` which only checks login status, not roles. Add a role guard.

**Create `src/app/guards/admin.guard.ts`:**
```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUserValue;

  if (!user?.token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Decode JWT payload to check roles
  try {
    const payload = JSON.parse(atob(user.token.split('.')[1]));
    const roles: string[] = payload.roles || [];
    if (roles.includes('ROLE_ADMIN') || roles.includes('ADMIN')) {
      return true;
    }
  } catch {
    // Invalid token
  }

  router.navigate(['/dashboard']);
  return false;
};
```

**Update `src/app/app.routes.ts`** — import `adminGuard` and use it on admin routes:
```typescript
import { adminGuard } from './guards/admin.guard';

// Change these 3 routes:
{
  path: 'admin/users',
  canActivate: [adminGuard],  // was [authGuard]
  ...
},
{
  path: 'admin/users/new',
  canActivate: [adminGuard],  // was [authGuard]
  ...
},
{
  path: 'admin/users/:id/edit',
  canActivate: [adminGuard],  // was [authGuard]
  ...
}
```

---

## Phase 3: Translate to English

The app mixes Italian and English. Standardize everything to English.

### T3.1 — Translate home page

**File: `src/app/pages/home/home.html`**
- `"Gestisci i Tuoi Microservizi con Semplicità"` → `"Manage Your Microservices with Ease"`
- `"Una dashboard intuitiva per monitorare e interagire con la tua architettura a microservizi."` → `"An intuitive dashboard to monitor and interact with your microservices architecture."`
- `"Scopri i Servizi"` → `"Explore Services"`
- `"I Tuoi Servizi"` → `"Your Services"`
- `"Esplora i microservizi che compongono la tua applicazione."` → `"Explore the microservices that make up your application."`

**File: `src/app/pages/home/home.ts`** — translate feature descriptions and stats:
```typescript
// Features array:
{ icon: 'key', title: 'Security Service', description: 'Manage user authentication and authorization.', link: '/auth/login' },
{ icon: 'box', title: 'Management & Processing', description: 'Manage products, customers, and orders.', link: '/products' },
{ icon: 'layers', title: 'Batch Service', description: 'Start and monitor asynchronous batch processing jobs.', link: '/batch' },
{ icon: 'users', title: 'User Management', description: 'Advanced user and role management (restricted access).', link: '/admin/users' },
{ icon: 'shopping-cart', title: 'Orders Overview', description: 'View and track the status of all orders.', link: '/orders' }

// Stats array:
{ label: 'Active Services', target: 6, value: 0 },
{ label: 'Registered Users', target: 120, value: 0 },
{ label: 'Transactions Today', target: 540, value: 0 }
```

Note: also add `link: '/batch'` to the Batch Service feature (currently missing, the card had no link).

### T3.2 — Translate sidebar

**File: `src/app/shared/sidebar/sidebar.component.html`** (or the moved location from T2.1)

Translate all labels:
- `"Prodotti"` → `"Products"`
- `"Clienti"` → `"Customers"`
- `"Ordini"` → `"Orders"`
- `"Profilo"` → `"Profile"`
- `"Gestione Utenti"` → `"User Management"`

---

## Phase 4: Dashboard Redesign

### T4.1 — Dashboard with real data from API

Replace the placeholder dashboard with one that loads actual counts from the backend.

**File: `src/app/pages/dashboard/dashboard.ts`** — rewrite:
```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { OrderService } from '../../core/services/order.service';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);

  username = '';
  stats = { products: 0, customers: 0, orders: 0, pendingOrders: 0 };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.username = this.authService.currentUserValue?.username || '';

    forkJoin({
      products: this.productService.getAll(0, 1),
      customers: this.customerService.getAll(0, 1),
      orders: this.orderService.getAll(0, 1)
    }).subscribe({
      next: (data) => {
        this.stats.products = data.products.totalElements;
        this.stats.customers = data.customers.totalElements;
        this.stats.orders = data.orders.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data.';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
```

**File: `src/app/pages/dashboard/dashboard.html`** — rewrite:
```html
<div class="dashboard">
  <h2>Welcome, {{ username }}</h2>

  <div *ngIf="loading" class="loading">Loading dashboard data...</div>
  <div *ngIf="error" class="error-message">{{ error }}</div>

  <div class="stats-grid" *ngIf="!loading && !error">
    <a routerLink="/products" class="stat-card">
      <span class="stat-value">{{ stats.products }}</span>
      <span class="stat-label">Products</span>
    </a>
    <a routerLink="/customers" class="stat-card">
      <span class="stat-value">{{ stats.customers }}</span>
      <span class="stat-label">Customers</span>
    </a>
    <a routerLink="/orders" class="stat-card">
      <span class="stat-value">{{ stats.orders }}</span>
      <span class="stat-label">Orders</span>
    </a>
  </div>

  <div class="quick-actions">
    <h3>Quick Actions</h3>
    <div class="actions-grid">
      <a routerLink="/products/new" class="action-card">
        <span class="action-icon">+</span>
        <span>New Product</span>
      </a>
      <a routerLink="/customers/new" class="action-card">
        <span class="action-icon">+</span>
        <span>New Customer</span>
      </a>
      <a routerLink="/orders/new" class="action-card">
        <span class="action-icon">+</span>
        <span>New Order</span>
      </a>
      <a routerLink="/batch" class="action-card">
        <span class="action-icon">&#9881;</span>
        <span>Batch Jobs</span>
      </a>
    </div>
  </div>
</div>
```

**File: `src/app/pages/dashboard/dashboard.css`** — add styles for stats grid:
```css
.dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard h2 {
  color: var(--color-accent, #FFD700);
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--color-text, #F0F0F0);
}

.error-message {
  background: rgba(220, 53, 69, 0.15);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--color-surface, #2E2E2E);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: var(--color-text, #F0F0F0);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: var(--color-accent, #FFD700);
}

.stat-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent, #FFD700);
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
}

.quick-actions h3 {
  color: var(--color-text, #F0F0F0);
  margin-bottom: 1rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.action-card {
  background: var(--color-surface, #2E2E2E);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: var(--color-text, #F0F0F0);
  transition: transform 0.2s, background 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.action-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 215, 0, 0.08);
}

.action-icon {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
```

---

## Phase 5: Code Quality

### T5.1 — Remove HttpClientModule from component imports

With `provideHttpClient()` in `app.config.ts`, individual components must NOT import `HttpClientModule` — it creates a second `HttpClient` instance that bypasses interceptors.

Check all component files for `HttpClientModule` in their `imports` array and remove it. Known offenders (if the old files from T0.1/T0.2 were the only ones, this may already be fixed by deletion):
- Search all `.ts` files under `src/app/` for `HttpClientModule`
- Remove it from any component's `imports` array
- Remove the import statement `import { HttpClientModule } from '@angular/common/http';`

### T5.2 — Use inject() consistently instead of constructor injection

Some components use `inject()` (modern pattern), others use constructor injection. Standardize on `inject()`.

**Files to update** (if any still use constructor injection after Phase 0 deletions):
- Search for `constructor(private` in all `.ts` files under `src/app/pages/` and `src/app/shared/`
- Convert to `private fieldName = inject(ServiceName);` pattern
- Move form initialization from constructor to field initializer or `ngOnInit`

**Example conversion:**
```typescript
// OLD:
constructor(private fb: FormBuilder, private authService: AuthService) {
  this.form = this.fb.group({...});
}

// NEW:
private fb = inject(FormBuilder);
private authService = inject(AuthService);
form = this.fb.group({...});
```

### T5.3 — Replace *ngIf / *ngFor with @if / @for (Angular 17+ control flow)

Angular 17+ has built-in control flow syntax that replaces structural directives. This is the modern approach and removes the need for `CommonModule` in many components.

**Pattern to apply across ALL template files (*.html):**

```html
<!-- OLD -->
<div *ngIf="condition">content</div>
<div *ngIf="condition; else other">content</div>
<ng-template #other>other content</ng-template>

<!-- NEW -->
@if (condition) {
  <div>content</div>
} @else {
  <div>other content</div>
}

<!-- OLD -->
<div *ngFor="let item of items; trackBy: trackFn">{{ item }}</div>

<!-- NEW -->
@for (item of items; track item.id) {
  <div>{{ item }}</div>
} @empty {
  <div>No items found.</div>
}
```

After converting all templates, remove `CommonModule` from the `imports` array of components that no longer need it (components that only used `*ngIf`, `*ngFor`, `*ngSwitch`). Keep `CommonModule` if the component uses pipes like `| number`, `| date`, `| currency`, etc.

**Priority files (most impacted):**
- `src/app/pages/home/home.html` — heavy use of `*ngFor` and `*ngIf`
- `src/app/pages/products/products-page/products-page.html`
- `src/app/pages/customers/customer-list/customer-list.component.html`
- `src/app/pages/orders/order-list/order-list.component.html`
- `src/app/pages/orders/order-detail/order-detail.component.html`
- `src/app/pages/admin/user-list/user-list.component.html`
- `src/app/shared/sidebar/sidebar.component.html`

---

## Phase 6: Polish

### T6.1 — Hide admin sidebar link for non-admin users

The sidebar always shows "User Management" even for regular users who can't access it.

**File: `src/app/shared/sidebar/sidebar.component.ts`** (after T2.1 move)

Add role checking:
```typescript
import { AuthService } from '../../core/services/auth';

// Add to the component class:
private authService = inject(AuthService);

get isAdmin(): boolean {
  const user = this.authService.currentUserValue;
  if (!user?.token) return false;
  try {
    const payload = JSON.parse(atob(user.token.split('.')[1]));
    const roles: string[] = payload.roles || [];
    return roles.includes('ROLE_ADMIN') || roles.includes('ADMIN');
  } catch {
    return false;
  }
}
```

**In the sidebar template**, wrap the admin link:
```html
@if (isAdmin) {
  <li routerLink="/admin/users" routerLinkActive="active">
    <i class="icon">&#9881;</i>
    <span *ngIf="!collapsed">User Management</span>
  </li>
}
```

### T6.2 — Remove batch job trigger from home page

The home page currently has batch job trigger logic (`startBatchJob()`, `batchMessage`, `batchErrorMessage`). This belongs on the `/batch` page, not the landing page.

**File: `src/app/pages/home/home.ts`** — remove:
- `BatchService` import and injection
- `batchMessage` and `batchErrorMessage` properties
- `startBatchJob()` method
- The Batch Service feature should keep its `link: '/batch'` but should NOT have an `action` property

**File: `src/app/pages/home/home.html`** — remove:
- The `batchMessage` / `batchErrorMessage` display divs
- Any button with `(click)="startBatchJob()"`

### T6.3 — Remove fake stats from home page

The home page shows hardcoded stats (7 services, 120 users, 540 transactions) that are fake.

**Option A (recommended):** Remove the stats section entirely from `home.html` and `home.ts` (delete `stats` array, `startStatsCounter()` method, the stats grid HTML).

**Option B:** Keep but make them fetch real data (similar to dashboard). This is more work and duplicates the dashboard.

---

## Build Verification

After all phases, run:
```bash
cd ui-angular-app
npm install
npm run build
```

The build must complete with zero errors. Fix any TypeScript compilation issues introduced by the changes.
