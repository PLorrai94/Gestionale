import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Home page
      {
        path: '',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/home/home').then(m => m.HomeComponent)
      },
      // Products page
      {
        path: 'products',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/products/products').then(m => m.ProductsComponent)
      },
      // Register
      {
        path: 'auth/register',
        canActivate: [loginGuard],
        loadComponent: () =>
          import('./pages/auth/register/register').then(m => m.RegisterComponent)
      },
      // Login
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
        path: 'products/all',
        canActivate: [authGuard],
        loadComponent: () =>
  import('./pages/products/products-page/products-page').then(m => m.ProductsPageComponent)
      }

    ]
  },
  // Fallback route
  { path: '**', redirectTo: '' }
];
