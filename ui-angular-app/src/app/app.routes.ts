import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'auth/register',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/auth/register/register').then(m => m.RegisterComponent)
      },
      {
        path: 'auth/login',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/auth/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/products/products-page/products-page').then(m => m.ProductsPageComponent)
      },
      {
        path: 'products/new',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/products/product-form/product-form.component').then(m => m.ProductFormComponent)
      },
      {
        path: 'products/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/products/product-form/product-form.component').then(m => m.ProductFormComponent)
      },
      {
        path: 'customers',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent)
      },
      {
        path: 'customers/new',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'customers/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent)
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/orders/order-list/order-list.component').then(m => m.OrderListComponent)
      },
      {
        path: 'orders/new',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/orders/order-form/order-form.component').then(m => m.OrderFormComponent)
      },
      {
        path: 'orders/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/orders/order-detail/order-detail.component').then(m => m.OrderDetailComponent)
      },
      {
        path: 'admin/users',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/admin/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'admin/users/new',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/admin/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'admin/users/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/admin/user-form/user-form.component').then(m => m.UserFormComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
